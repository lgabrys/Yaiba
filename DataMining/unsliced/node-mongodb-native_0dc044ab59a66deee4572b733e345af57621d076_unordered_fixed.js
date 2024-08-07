var shared = require('../shared')
	, common = require('./common')
	, utils = require('../../utils')
  , hasWriteCommands = utils.hasWriteCommands
  , WriteError = common.WriteError
  , BatchWriteResult = common.BatchWriteResult
  , LegacyOp = common.LegacyOp
  , Batch = common.Batch
  , mergeBatchResults = common.mergeBatchResults;

/**
 * Create a new UnorderedBulkOperation instance (INTERNAL TYPE, do not instantiate directly)
 *
 * Options
 *  - **w**, {Number/String, > -1 || 'majority' || tag name} the write concern for the operation where < 1 is no acknowlegement of write and w >= 1, w = 'majority' or tag acknowledges the write
 *  - **wtimeout**, {Number, 0} set the timeout for waiting for write concern to finish (combines with w option)
 *  - **fsync**, (Boolean, default:false) write waits for fsync before returning
 *  - **journal**, (Boolean, default:false) write waits for journal sync before returning
 *
 * @class Represents a UnorderedBulkOperation
 * @param {Object} collection collection instance.
 * @param {Object} [options] additional options for the collection.
 * @return {Object} a ordered bulk operation instance.
 */
var UnorderedBulkOperation = function(collection, options) {
	options = options == null ? {} : options;

	// Contains reference to self
	var self = this;
	// Get the namesspace for the write operations
  var namespace = collection.collectionName;
  // Used to mark operation as executed
  var executed = false;

  // Let's us force backward compatible legacy op use
	var useLegacyOps = options.useLegacyOps || false;

	// Current item
  // var currentBatch = null;
	var currentOp = null;
	var currentIndex = 0;
  var currentBatchSize = 0;
  var currentBatchSizeBytes = 0;
  var batches = [];

  // The current Batches for the different operations
  var currentInsertBatch = null;
  var currentUpdateBatch = null;
  var currentRemoveBatch = null;

	// Handle to the bson serializer, used to calculate running sizes
  var db = collection.db;
	var bson = db.bson;

  // Set max byte size
	var maxBatchSizeBytes = db.serverConfig.checkoutWriter().maxBsonSize;
	var maxNumberOfDocsInBatch = db.serverConfig.checkoutWriter().maxNumberOfDocsInBatch;

  // Get the write concern
  var writeConcern = shared._getWriteConcern(collection, options);

  // Final results
  var mergeResults = { 
      n: 0
    , upserted: []
    , errDetails: []
    , wcErrors: 0
    , nInserted: 0
    , nUpserted: 0
    , nUpdated: 0
    , nRemoved: 0      
  }

  // Specify a full class so we can generate documentation correctly
	var FindOperators = function() {
		/**
		 * Add a single update document to the bulk operation
		 *
		 * @param {Object} doc update operations
		 * @return {UnorderedBulkOperation}
		 * @api public
		 */
		this.update = function(updateDocument) {
			// Perform upsert
			var upsert = typeof currentOp.upsert == 'boolean' ? currentOp.upsert : false;
			
			// Establish the update command
			var document = {
					q: currentOp.selector
				, u: updateDocument
				, multi: true
				, upsert: upsert
			}

			// Clear out current Op
			currentOp = null;
			// Add the update document to the list
			return addToOperationsList(self, common.UPDATE, document);
		}	

		/**
		 * Add a single update one document to the bulk operation
		 *
		 * @param {Object} doc update operations
		 * @return {UnorderedBulkOperation}
		 * @api public
		 */
		this.updateOne = function(updateDocument) {
			// Perform upsert
			var upsert = typeof currentOp.upsert == 'boolean' ? currentOp.upsert : false;
			
			// Establish the update command
			var document = {
					q: currentOp.selector
				, u: updateDocument
				, multi: false
				, upsert: upsert
			}

			// Clear out current Op
			currentOp = null;
			// Add the update document to the list
			return addToOperationsList(self, common.UPDATE, document);
		}

		/**
		 * Add a replace one operation to the bulk operation
		 *
		 * @param {Object} doc the new document to replace the existing one with
		 * @return {UnorderedBulkOperation}
		 * @api public
		 */
		this.replaceOne = function(updateDocument) {
			this.updateOne(updateDocument);
		}

		/**
		 * Upsert modifier for update bulk operation
		 *
		 * @return {UnorderedBulkOperation}
		 * @api public
		 */
		this.upsert = function() {
			currentOp.upsert = true;
			return this;
		}

		/**
		 * Add a remove one operation to the bulk operation
		 *
		 * @param {Object} doc selector for the removal of documents
		 * @return {UnorderedBulkOperation}
		 * @api public
		 */
		this.removeOne = function() {		
			// Establish the update command
			var document = {
					q: currentOp.selector
				, limit: 1
			}

			// Clear out current Op
			currentOp = null;
			// Add the remove document to the list
			return addToOperationsList(self, common.REMOVE, document);
		}

		/**
		 * Add a remove operation to the bulk operation
		 *
		 * @param {Object} doc selector for the single document to remove
		 * @return {UnorderedBulkOperation}
		 * @api public
		 */
		this.remove = function() {
			// Establish the update command
			var document = {
					q: currentOp.selector
				, limit: 0
			}

			// Clear out current Op
			currentOp = null;
			// Add the remove document to the list
			return addToOperationsList(self, common.REMOVE, document);				
		}
	}

	// 
	// Add to the operations list
	//
	var addToOperationsList = function(_self, docType, document) {
    // Get the bsonSize
    var bsonSize = bson.calculateObjectSize(document, false);
    // Throw error if the doc is bigger than the max BSON size
    if(bsonSize >= maxBatchSizeBytes) throw utils.toError("document is larger than the maximum size " + maxBatchSizeBytes);
    // Holds the current batch
    var currentBatch = null;
    // Get the right type of batch
    if(docType == common.INSERT) {
    	currentBatch = currentInsertBatch;
    } else if(docType == common.UPDATE) {
    	currentBatch = currentUpdateBatch;
    } else if(docType == common.REMOVE) {
    	currentBatch = currentRemoveBatch;
    }

    // Create a new batch object if we don't have a current one
    if(currentBatch == null) currentBatch = new Batch(docType, currentIndex);
    
    // Check if we need to switch batch type
    if(currentBatch.batchType != docType) {
      // Save current batch
      batches.push(currentBatch);
      // Create a new batch
      currentBatch = new Batch(docType, currentIndex);  
    }

    // Update current batch size
    currentBatchSize = currentBatchSize + 1;
    currentBatchSizeBytes = currentBatchSizeBytes + bsonSize;

    // Check if we need to create a new batch
    if((currentBatchSize >= maxNumberOfDocsInBatch)
      || (currentBatchSizeBytes >= maxBatchSizeBytes)) {
      // Save the batch to the execution stack
      batches.push(currentBatch);
      
      // Create a new batch
      currentBatch = new Batch(docType, currentIndex);
      
      // Reset the current size trackers
      currentBatchSize = 0;
      currentBatchSizeBytes = 0;
    }

    // We have an array of documents
    if(Array.isArray(document)) {
      currentBatch.operations = currentBatch.operations.concat(document);
      currentIndex = currentIndex + document.length;
    } else {
      currentBatch.operations.push(document);
      currentBatch.originalIndexes.push(currentIndex);
      currentIndex = currentIndex + 1;
    }

    // Save back the current Batch to the right type
    if(docType == common.INSERT) {
    	currentInsertBatch = currentBatch;
    } else if(docType == common.UPDATE) {
    	currentUpdateBatch = currentBatch;
    } else if(docType == common.REMOVE) {
    	currentRemoveBatch = currentBatch;
    }

    // Return self
		return _self;
	}

	/**
	 * Add a single insert document to the bulk operation
	 *
	 * @param {Object} doc the document to insert
	 * @return {UnorderedBulkOperation}
	 * @api public
	 */
	this.insert = function(document) {
		return addToOperationsList(self, common.INSERT, document);
	}

	/**
	 * Initiate a find operation for an update/updateOne/remove/removeOne/replaceOne
	 *
	 * @param {Object} selector the selector used to locate documents for the operation
	 * @return {UnorderedBulkOperation}
	 * @api public
	 */
	this.find = function(selector) {
		// Save a current selector
		currentOp = {
			selector: selector
		}

		return new FindOperators();
	}	

	//
	// Execute the command
	var executeBatch = function(batch, callback) {
		// Contains the command we are going to execute
		var cmd = null;

    // Generate the right update
    if(batch.batchType == common.UPDATE) {
      cmd = { update: namespace, updates: batch.operations, ordered: false }
    } else if(batch.batchType == common.INSERT) {
      cmd = { insert: namespace, documents: batch.operations, ordered: false }
    } else if(batch.batchType == common.REMOVE) {
      cmd = { delete: namespace, deletes: batch.operations, ordered: false }
    }

    // If we have a write concern
    if(writeConcern != null) {
      cmd.writeConcern = writeConcern;
    }    

		// Execute the write command
		db.command(cmd, function(err, result) {
			// Merge the results together
			callback(null, mergeBatchResults(false, batch, mergeResults, err, result));
		});
	}

	//
	// Execute all the commands
	var executeBatches = function(callback) {
		var numberOfCommandsToExecute = batches.length;
		// Execute over all the batches
		for(var i = 0; i < batches.length; i++) {
			executeBatch(batches[i], function(err, result) {
				numberOfCommandsToExecute = numberOfCommandsToExecute - 1;

				// Execute
				if(numberOfCommandsToExecute == 0) {
					callback(null, new BatchWriteResult(mergeResults));
				}
			});
		}
	}

	/**
	 * Execute the unordered bulk operation
	 *
	 * Options
	 *  - **w**, {Number/String, > -1 || 'majority' || tag name} the write concern for the operation where < 1 is no acknowlegement of write and w >= 1, w = 'majority' or tag acknowledges the write
	 *  - **wtimeout**, {Number, 0} set the timeout for waiting for write concern to finish (combines with w option)
	 *  - **fsync**, (Boolean, default:false) write waits for fsync before returning
	 *  - **journal**, (Boolean, default:false) write waits for journal sync before returning
	 *
	 * @param {Object} [options] additional options during update.
	 * @param {Function} callback this will be called after executing this method. The first parameter will contain the Error object if an error occured, or null otherwise. While the second parameter will contain the results from from the unordered bulk operation.
	 * @return {null}
	 * @api public
	 */
	this.execute = function(_writeConcern, callback) {
		if(executed) throw new util.toError("batch cannot be re-executed");
		if(typeof _writeConcern == 'function') {
			callback = _writeConcern;
		} else {
			writeConcern = _writeConcern;
		}

    // If we have current batch
    if(currentInsertBatch) batches.push(currentInsertBatch);
    if(currentUpdateBatch) batches.push(currentUpdateBatch);
    if(currentRemoveBatch) batches.push(currentRemoveBatch);

		// Check if we support bulk commands, override if needed to use legacy ops
		if(hasWriteCommands(db.serverConfig.checkoutWriter()) && !useLegacyOps)
			return executeBatches(callback);

		// Run in backward compatibility mode
		backwardsCompatibilityExecuteCommands(callback);
	}	

	//
	// Merge legacy error
	var mergeLegacyError = function(_err, _batch, _op, _i, _result) {
		var errmsg = _err.errmsg || _err.err;
		errmsg = _err.wtimeout || errmsg;
		errmsg = _err.wnote || errmsg;
		errmsg = _err.jnote || errmsg;
		errmsg = _err.message || errmsg;

		if(!Array.isArray(_result.errDetails)) _result.errDetails = [];
		_result.errDetails.push({
				index: _i
			, errmsg: errmsg
			, code: _err.code || common.UNKNOWN_ERROR
			, op: _op.operation
		});
	}

	// 
	// Execute the inserts
	var executeInserts = function(_collection, _batch, _result, _callback) {
		var totalNumberOfInserts = _batch.operations.length;
		// Options for the update operation
		var batchOptions = writeConcern || {};
		if(useLegacyOps) batchOptions.useLegacyOps = true;

		// Execute the op
		var executeLegacyInsert = function(_i, _op, _options, __callback) {
			// Execute the update
			_collection.insert(_op.operation, _options, function(err, r) {
				// Merge the results in 
				var result = common.mergeLegacyResults(false, _op.operation, _batch, mergeResults, err || r, _op.index);
				if(result == false) {
					return _callback(null, new BatchWriteResult(mergeResults));
				}

				__callback(null, _result);
			});
		}

		// Execute all the insert operations
		for(var i = 0; i < _batch.operations.length; i++) {
			var legacyOp = new LegacyOp(_batch.batchType, _batch.operations[i], _batch.originalIndexes[i]);
			executeLegacyInsert(i, legacyOp, batchOptions, function(err, result) {
				totalNumberOfInserts = totalNumberOfInserts - 1;
				
				// No more inserts
				if(totalNumberOfInserts == 0) {
					_callback(null, _result);
				}
			});
		}
	}

	//
	// Execute updates
	var executeUpdates = function(_collection, _batch, _result, _callback) {
		var totalNumberOfUpdates = _batch.operations.length;
		// Options for the update operation
		var batchOptions = writeConcern || {};
		if(useLegacyOps) batchOptions.useLegacyOps = true;

		// Execute the op
		var executeLegacyUpdate = function(_i, _op, _options, __callback) {
			var options = common.cloneOptions(batchOptions);

			// Add any additional options
			if(_op.operation.multi != null) options.multi = _op.operation.multi ? true : false;
			if(_op.operation.upsert != null) options.upsert = _op.operation.upsert;

			// Execute the update
			_collection.update(_op.operation.q, _op.operation.u, options, function(err, r, full) {
				// Merge the results in 
				var result = common.mergeLegacyResults(false, _op.operation, _batch, mergeResults, err || full, _op.index);
				if(result == false) {
					return _callback(null, new BatchWriteResult(mergeResults));
				}

				return __callback(null, _result);
			});
		}

		// Execute all the insert operations
		for(var i = 0; i < _batch.operations.length; i++) {
			var legacyOp = new LegacyOp(_batch.batchType, _batch.operations[i], _batch.originalIndexes[i]);
			executeLegacyUpdate(i, legacyOp, options, function(err, result) {
				totalNumberOfUpdates = totalNumberOfUpdates - 1;
				
				// No more inserts
				if(totalNumberOfUpdates == 0) {
					_callback(null, _result);
				}
			});
		}
	}

	//
	// Execute updates
	var executeRemoves = function(_collection, _batch, _result, _callback) {
		var totalNumberOfRemoves = _batch.operations.length;
		// Options for the update operation
		var batchOptions = writeConcern || {};
		if(useLegacyOps) batchOptions.useLegacyOps = true;

		// Execute the op
		var executeLegacyRemove = function(_i, _op, _options, __callback) {
			var options = common.cloneOptions(batchOptions);

			// Add any additional options
			if(_op.operation.limit != null) options.single = _op.operation.limit == 1 ? true : false;

			// Execute the update
			_collection.remove(_op.operation.q, options, function(err, r) {
				// Merge the results in 
				var result = common.mergeLegacyResults(false, _op.operation, _batch, mergeResults, err || r, _op.index);
				if(result == false) {
					return _callback(null, new BatchWriteResult(mergeResults));
				}

				return __callback(null, _result);
			});
		}

		// Execute all the insert operations
		for(var i = 0; i < _batch.operations.length; i++) {
			var legacyOp = new LegacyOp(_batch.batchType, _batch.operations[i], _batch.originalIndexes[i]);
			executeLegacyRemove(i, legacyOp, options, function(err, result) {
				totalNumberOfRemoves = totalNumberOfRemoves - 1;
				
				// No more inserts
				if(totalNumberOfRemoves == 0) {
					_callback(null, _result);
				}
			});
		}
	}

	//
	// Execute all operation in backwards compatible fashion
	var backwardsCompatibilityExecuteCommands = function(callback) {
		if(batches.length == 0) {
			return callback(null, new BatchWriteResult(mergeResults));
		}

		// Ordered execution of the command
		var batch = batches.shift();

		// Process the legacy operations
		var processLegacyOperations = function(err, results) {
			// Merge the results together
			var mergeResult = mergeBatchResults(false, batch, mergeResults, err, results);
			if(mergeResult != null) {
				return callback(null, mergeResult)
			}

			// Execute the next step
			backwardsCompatibilityExecuteCommands(callback);			
		}

		// Execute an insert batch
		if(batch.batchType == common.INSERT) {
			return executeInserts(collection, batch, {n: 0}, processLegacyOperations);
		}

		// Execute an update batch
		if(batch.batchType == common.UPDATE) {
			return executeUpdates(collection, batch, {n: 0}, processLegacyOperations);
		}

		// Execute an update batch
		if(batch.batchType == common.REMOVE) {
			return executeRemoves(collection, batch, {n: 0}, processLegacyOperations);
		}
	}	
}

/**
 * Returns an unordered batch object
 *
 */
var initializeUnorderedBulkOp = function(options) {
	return new UnorderedBulkOperation(this, options);
}

exports.initializeUnorderedBulkOp = initializeUnorderedBulkOp;