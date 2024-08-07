var QueryCommand = require('./commands/query_command').QueryCommand,
  GetMoreCommand = require('./commands/get_more_command').GetMoreCommand,
  KillCursorCommand = require('./commands/kill_cursor_command').KillCursorCommand,
  Long = require('bson').Long,
  ReadPreference = require('./connection/read_preference').ReadPreference,
  CursorStream = require('./cursorstream'),
  utils = require('./utils');

/**
 * Constructor for a cursor object that handles all the operations on query result
 * using find. This cursor object is unidirectional and cannot traverse backwards. Clients should not be creating a cursor directly,
 * but use find to acquire a cursor.
 *
 * Options
 *  - **skip** {Number} skip number of documents to skip.
 *  - **limit** {Number}, limit the number of results to return. -1 has a special meaning and is used by Db.eval. A value of 1 will also be treated as if it were -1.
 *  - **sort** {Array | Object}, set to sort the documents coming back from the query. Array of indexes, [['a', 1]] etc.
 *  - **hint**  {Object}, hint force the query to use a specific index.
 *  - **explain** {Boolean}, explain return the explaination of the query.
 *  - **snapshot** {Boolean}, snapshot Snapshot mode assures no duplicates are returned.
 *  - **timeout** {Boolean}, timeout allow the query to timeout.
 *  - **tailable** {Boolean}, tailable allow the cursor to be tailable.
 *  - **awaitdata** {Boolean}, awaitdata allow the cursor to wait for data, only applicable for tailable cursor.
 *  - **batchSize** {Number}, batchSize the number of the subset of results to request the database to return for every request. This should initially be greater than 1 otherwise the database will automatically close the cursor. The batch size can be set to 1 with cursorInstance.batchSize after performing the initial query to the database.
 *  - **raw** {Boolean}, raw return all query documents as raw buffers (default false).
 *  - **read** {Boolean}, read specify override of read from source (primary/secondary).
 *  - **slaveOk** {Boolean}, slaveOk, sets the slaveOk flag on the query wire protocol for secondaries.
 *  - **returnKey** {Boolean}, returnKey only return the index key.
 *  - **maxScan** {Number}, maxScan limit the number of items to scan.
 *  - **min** {Number}, min set index bounds.
 *  - **max** {Number}, max set index bounds.
 *  - **showDiskLoc** {Boolean}, showDiskLoc show disk location of results.
 *  - **comment** {String}, comment you can put a $comment field on a query to make looking in the profiler logs simpler.
 *  - **numberOfRetries** {Number}, numberOfRetries if using awaidata specifies the number of times to retry on timeout.
 *  - **dbName** {String}, dbName override the default dbName.
 *  - **tailableRetryInterval** {Number}, tailableRetryInterval specify the miliseconds between getMores on tailable cursor.
 *  - **exhaust** {Boolean}, exhaust have the server send all the documents at once as getMore packets.
 *  - **partial** {Boolean}, partial have the sharded system return a partial result from mongos.
 *
 * @class Represents a Cursor.
 * @param {Db} db the database object to work with.
 * @param {Collection} collection the collection to query.
 * @param {Object} selector the query selector.
 * @param {Object} fields an object containing what fields to include or exclude from objects returned.
 * @param {Object} [options] additional options for the collection.
*/
function Cursor(db, collection, selector, fields, options) {
  this.db = db;
  this.collection = collection;
  this.selector = selector;
  this.fields = fields;
  options = !options ? {} : options;

  this.skipValue = options.skip == null ? 0 : options.skip;
  this.limitValue = options.limit == null ? 0 : options.limit;
  this.sortValue = options.sort;
  this.hint = options.hint;
  this.explainValue = options.explain;
  this.snapshot = options.snapshot;
  this.timeout = options.timeout == null ? true : options.timeout;
  this.tailable = options.tailable;
  this.awaitdata = options.awaitdata;
  this.numberOfRetries = options.numberOfRetries == null ? 5 : options.numberOfRetries;
  this.currentNumberOfRetries = this.numberOfRetries;
  this.batchSizeValue = options.batchSize == null ? 0 : options.batchSize;
  this.slaveOk = options.slaveOk == null ? collection.slaveOk : options.slaveOk;
  this.raw = options.raw == null ? false : options.raw;
  this.read = options.read == null ? ReadPreference.PRIMARY : options.read;
  this.returnKey = options.returnKey;
  this.maxScan = options.maxScan;
  this.min = options.min;
  this.max = options.max;
  this.showDiskLoc = options.showDiskLoc;
  this.comment = options.comment;
  this.tailableRetryInterval = options.tailableRetryInterval || 100;
  this.exhaust = options.exhaust || false;
  this.partial = options.partial || false;

  this.totalNumberOfRecords = 0;
  this.items = [];
  this.cursorId = Long.fromInt(0);

  // This name
  this.dbName = options.dbName;

  // State variables for the cursor
  this.state = Cursor.INIT;
  // Keep track of the current query run
  this.queryRun = false;
  this.getMoreTimer = false;

  // If we are using a specific db execute against it
  if(this.dbName != null) {
    this.collectionName = this.dbName + "." + this.collection.collectionName;
  } else {
    this.collectionName = (this.db.databaseName ? this.db.databaseName + "." : '') + this.collection.collectionName;
  }
};

/**
 * Resets this cursor to its initial state. All settings like the query string,
 * tailable, batchSizeValue, skipValue and limits are preserved.
 *
 * @return {Cursor} returns itself with rewind applied.
 * @api public
 */
Cursor.prototype.rewind = function() {
  var self = this;

  if (self.state != Cursor.INIT) {
    if (self.state != Cursor.CLOSED) {
      self.close(function() {});
    }

    self.numberOfReturned = 0;
    self.totalNumberOfRecords = 0;
    self.items = [];
    self.cursorId = Long.fromInt(0);
    self.state = Cursor.INIT;
    self.queryRun = false;
  }

  return self;
};


/**
 * Returns an array of documents. The caller is responsible for making sure that there
 * is enough memory to store the results. Note that the array only contain partial
 * results when this cursor had been previouly accessed. In that case,
 * cursor.rewind() can be used to reset the cursor.
 *
 * @param {Function} callback This will be called after executing this method successfully. The first paramter will contain the Error object if an error occured, or null otherwise. The second paramter will contain an array of BSON deserialized objects as a result of the query.
 * @return {null}
 * @api public
 */
Cursor.prototype.toArray = function(callback) {
  var self = this;

  if(!callback) {
    throw new Error('callback is mandatory');
  }

  if(this.tailable) {
    callback(new Error("Tailable cursor cannot be converted to array"), null);
  } else if(this.state != Cursor.CLOSED) {
    var items = [];

    this.each(function(err, item) {
      if(err != null) return callback(err, null);

      if(item != null && Array.isArray(items)) {
        items.push(item);
      } else {
        var resultItems = items;
        items = null;
        self.items = [];
        // Returns items
        callback(err, resultItems);
      }
    });
  } else {
    callback(new Error("Cursor is closed"), null);
  }
};

/**
 * Iterates over all the documents for this cursor. As with **{cursor.toArray}**,
 * not all of the elements will be iterated if this cursor had been previouly accessed.
 * In that case, **{cursor.rewind}** can be used to reset the cursor. However, unlike
 * **{cursor.toArray}**, the cursor will only hold a maximum of batch size elements
 * at any given time if batch size is specified. Otherwise, the caller is responsible
 * for making sure that the entire result can fit the memory.
 *
 * @param {Function} callback this will be called for while iterating every document of the query result. The first paramter will contain the Error object if an error occured, or null otherwise. While the second paramter will contain the document.
 * @return {null}
 * @api public
 */
Cursor.prototype.each = function(callback) {
  var self = this;

  if (!callback) {
    throw new Error('callback is mandatory');
  }

  if(this.state != Cursor.CLOSED) {
    //FIX: stack overflow (on deep callback) (cred: https://github.com/limp/node-mongodb-native/commit/27da7e4b2af02035847f262b29837a94bbbf6ce2)
    process.nextTick(function(){
      var s = new Date()
      // Fetch the next object until there is no more objects
      self.nextObject(function(err, item) {
        if(err != null) return callback(err, null);
        if(item != null) {
          callback(null, item);
          self.each(callback);
        } else {
          // Close the cursor if done
          self.state = Cursor.CLOSED;
          callback(err, null);
        }
      });
    });
  } else {
    callback(new Error("Cursor is closed"), null);
  }
};

/**
 * Determines how many result the query for this cursor will return
 *
 * @param {Function} callback this will be called after executing this method. The first paramter will contain the Error object if an error occured, or null otherwise. While the second paramter will contain the number of results or null if an error occured.
 * @return {null}
 * @api public
 */
Cursor.prototype.count = function(callback) {
  this.collection.count(this.selector, callback);
};

/**
 * Sets the sort parameter of this cursor to the given value.
 *
 * This method has the following method signatures:
 * (keyOrList, callback)
 * (keyOrList, direction, callback)
 *
 * @param {String|Array|Object} keyOrList This can be a string or an array. If passed as a string, the string will be the field to sort. If passed an array, each element will represent a field to be sorted and should be an array that contains the format [string, direction].
 * @param {String|Number} direction this determines how the results are sorted. "asc", "ascending" or 1 for asceding order while "desc", "desceding or -1 for descending order. Note that the strings are case insensitive.
 * @param {Function} callback this will be called after executing this method. The first parameter will contain an error object when the cursor is already closed while the second parameter will contain a reference to this object upon successful execution.
 * @return {Cursor} an instance of this object.
 * @api public
 */
Cursor.prototype.sort = function(keyOrList, direction, callback) {
  callback = callback || function(){};
  if(typeof direction === "function") { callback = direction; direction = null; }

  if(this.tailable) {
    callback(new Error("Tailable cursor doesn't support sorting"), null);
  } else if(this.queryRun == true || this.state == Cursor.CLOSED) {
    callback(new Error("Cursor is closed"), null);
  } else {
    var order = keyOrList;

    if(direction != null) {
      order = [[keyOrList, direction]];
    }

    this.sortValue = order;
    callback(null, this);
  }
  return this;
};

/**
 * Sets the limit parameter of this cursor to the given value.
 *
 * @param {Number} limit the new limit.
 * @param {Function} [callback] this optional callback will be called after executing this method. The first parameter will contain an error object when the limit given is not a valid number or when the cursor is already closed while the second parameter will contain a reference to this object upon successful execution.
 * @return {Cursor} an instance of this object.
 * @api public
 */
Cursor.prototype.limit = function(limit, callback) {
  if(this.tailable) {
    if(callback) {
      callback(new Error("Tailable cursor doesn't support limit"), null);
    } else {
      throw new Error("Tailable cursor doesn't support limit");
    }
  } else if(this.queryRun == true || this.state == Cursor.CLOSED) {
    if(callback) {
      callback(new Error("Cursor is closed"), null);
    } else {
      throw new Error("Cursor is closed");
    }
  } else {
    if(limit != null && limit.constructor != Number) {
      if(callback) {
        callback(new Error("limit requires an integer"), null);
      } else {
        throw new Error("limit requires an integer");
      }
    } else {
      this.limitValue = limit;
      if(callback) return callback(null, this);
    }
  }

  return this;
};

/**
 * Sets the read preference for the cursor
 *
 * @param {String} the read preference for the cursor, one of Server.READ_PRIMARY, Server.READ_SECONDARY, Server.READ_SECONDARY_ONLY
 * @param {Function} [callback] this optional callback will be called after executing this method. The first parameter will contain an error object when the read preference given is not a valid number or when the cursor is already closed while the second parameter will contain a reference to this object upon successful execution.
 * @return {Cursor} an instance of this object.
 * @api public
 */
Cursor.prototype.setReadPreference = function(readPreference, tags, callback) {
  if(typeof tags == 'function') callback = tags;
  callback = callback || function() {};

  if(this.queryRun == true || this.state == Cursor.CLOSED) {
    callback(new Error("Cannot change read preference on executed query or closed cursor"));
  } else if(readPreference == null && readPreference != 'primary'
    && readPreference != 'secondaryOnly' && readPreference != 'secondary') {
      callback(new Error("only readPreference of primary, secondary or secondaryOnly supported"));
  } else {
    this.read = readPreference;
  }

  return this;
}

/**
 * Sets the skip parameter of this cursor to the given value.
 *
 * @param {Number} skip the new skip value.
 * @param {Function} [callback] this optional callback will be called after executing this method. The first parameter will contain an error object when the skip value given is not a valid number or when the cursor is already closed while the second parameter will contain a reference to this object upon successful execution.
 * @return {Cursor} an instance of this object.
 * @api public
 */
Cursor.prototype.skip = function(skip, callback) {
  callback = callback || function(){};

  if(this.tailable) {
    callback(new Error("Tailable cursor doesn't support skip"), null);
  } else if(this.queryRun == true || this.state == Cursor.CLOSED) {
    callback(new Error("Cursor is closed"), null);
  } else {
    if(skip != null && skip.constructor != Number) {
      callback(new Error("skip requires an integer"), null);
    } else {
      this.skipValue = skip;
      callback(null, this);
    }
  }

  return this;
};

/**
 * Sets the batch size parameter of this cursor to the given value.
 *
 * @param {Number} batchSize the new batch size.
 * @param {Function} [callback] this optional callback will be called after executing this method. The first parameter will contain an error object when the batchSize given is not a valid number or when the cursor is already closed while the second parameter will contain a reference to this object upon successful execution.
 * @return {Cursor} an instance of this object.
 * @api public
 */
Cursor.prototype.batchSize = function(batchSize, callback) {
  if(this.state == Cursor.CLOSED) {
    if(callback != null) {
      return callback(new Error("Cursor is closed"), null);
    } else {
      throw new Error("Cursor is closed");
    }
  } else if(batchSize != null && batchSize.constructor != Number) {
    if(callback != null) {
      return callback(new Error("batchSize requires an integer"), null);
    } else {
      throw new Error("batchSize requires an integer");
    }
  } else {
    this.batchSizeValue = batchSize;
    if(callback != null) return callback(null, this);
  }

  return this;
};

/**
 * The limit used for the getMore command
 *
 * @return {Number} The number of records to request per batch.
 * @ignore
 * @api private
 */
var limitRequest = function(self) {
  var requestedLimit = self.limitValue;
  var absLimitValue = Math.abs(self.limitValue);
  var absBatchValue = Math.abs(self.batchSizeValue);

  if(absLimitValue > 0) {
    if (absBatchValue > 0) {
      requestedLimit = Math.min(absLimitValue, absBatchValue);
    }
  } else {
    requestedLimit = self.batchSizeValue;
  }

  return requestedLimit;
};


/**
 * Generates a QueryCommand object using the parameters of this cursor.
 *
 * @return {QueryCommand} The command object
 * @ignore
 * @api private
 */
var generateQueryCommand = function(self) {
  // Unpack the options
  var queryOptions = QueryCommand.OPTS_NONE;
  if(!self.timeout) {
    queryOptions |= QueryCommand.OPTS_NO_CURSOR_TIMEOUT;
  }

  if(self.tailable != null) {
    queryOptions |= QueryCommand.OPTS_TAILABLE_CURSOR;
    self.skipValue = self.limitValue = 0;

    // if awaitdata is set
    if(self.awaitdata != null) {
      queryOptions |= QueryCommand.OPTS_AWAIT_DATA;
    }
  }

  if(self.exhaust) {
    queryOptions |= QueryCommand.OPTS_EXHAUST;
  }

  if(self.slaveOk) {
    queryOptions |= QueryCommand.OPTS_SLAVE;
  }

  if(self.partial) {
    queryOptions |= QueryCommand.OPTS_PARTIAL;
  }

  // limitValue of -1 is a special case used by Db#eval
  var numberToReturn = self.limitValue == -1 ? -1 : limitRequest(self);

  // Check if we need a special selector
  if(self.sortValue != null || self.explainValue != null || self.hint != null || self.snapshot != null
      || self.returnKey != null || self.maxScan != null || self.min != null || self.max != null
      || self.showDiskLoc != null || self.comment != null) {

    // Build special selector
    var specialSelector = {'$query':self.selector};
    if(self.sortValue != null) specialSelector['orderby'] = utils.formattedOrderClause(self.sortValue);
    if(self.hint != null && self.hint.constructor == Object) specialSelector['$hint'] = self.hint;
    if(self.snapshot != null) specialSelector['$snapshot'] = true;
    if(self.returnKey != null) specialSelector['$returnKey'] = self.returnKey;
    if(self.maxScan != null) specialSelector['$maxScan'] = self.maxScan;
    if(self.min != null) specialSelector['$min'] = self.min;
    if(self.max != null) specialSelector['$max'] = self.max;
    if(self.showDiskLoc != null) specialSelector['$showDiskLoc'] = self.showDiskLoc;
    if(self.comment != null) specialSelector['$comment'] = self.comment;
    // If we have explain set only return a single document with automatic cursor close
    if(self.explainValue != null) {
      numberToReturn = (-1)*Math.abs(numberToReturn);
      specialSelector['$explain'] = true;
    }

    // Return the query
    return new QueryCommand(self.db, self.collectionName, queryOptions, self.skipValue, numberToReturn, specialSelector, self.fields);
  } else {
    return new QueryCommand(self.db, self.collectionName, queryOptions, self.skipValue, numberToReturn, self.selector, self.fields);
  }
};

/**
 * @return {Object} Returns an object containing the sort value of this cursor with
 *     the proper formatting that can be used internally in this cursor.
 * @ignore
 * @api private
 */
Cursor.prototype.formattedOrderClause = function() {
  return utils.formattedOrderClause(this.sortValue);
};

/**
 * Converts the value of the sort direction into its equivalent numerical value.
 *
 * @param sortDirection {String|number} Range of acceptable values:
 *     'ascending', 'descending', 'asc', 'desc', 1, -1
 *
 * @return {number} The equivalent numerical value
 * @throws Error if the given sortDirection is invalid
 * @ignore
 * @api private
 */
Cursor.prototype.formatSortValue = function(sortDirection) {
  return utils.formatSortValue(sortDirection);
};

/**
 * Gets the next document from the cursor.
 *
 * @param {Function} callback this will be called after executing this method. The first parameter will contain an error object on error while the second parameter will contain a document from the returned result or null if there are no more results.
 * @api public
 */
Cursor.prototype.nextObject = function(callback) {
  var self = this;

  if(self.state == Cursor.INIT) {
    var cmd;
    try {
      cmd = generateQueryCommand(self);
    } catch (err) {
      return callback(err, null);
    }

    var commandHandler = function(err, result) {
      if(err != null && result == null) return callback(err, null);

      if(!err && result.documents[0] && result.documents[0]['$err']) {
        return self.close(function() {callback(result.documents[0]['$err'], null);});
      }

      self.queryRun = true;
      self.state = Cursor.OPEN; // Adjust the state of the cursor
      self.cursorId = result.cursorId;
      self.totalNumberOfRecords = result.numberReturned;

      // Add the new documents to the list of items, using forloop to avoid
      // new array allocations and copying
      for(var i = 0; i < result.documents.length; i++) {
        self.items.push(result.documents[i]);
      }

      // Ignore callbacks until the cursor is dead for exhausted
      if(self.exhaust && result.cursorId.toString() == "0") {
        self.nextObject(callback);
      } else if(self.exhaust == false || self.exhaust == null) {
        self.nextObject(callback);
      }
    };

    // If we have no connection set on this cursor check one out
    if(self.connection == null) {
      try {
        self.connection = this.read == null ? self.db.serverConfig.checkoutWriter() : self.db.serverConfig.checkoutReader(this.read);
      } catch(err) {
        return callback(err, null);
      }
    }

    // Execute the command
    self.db._executeQueryCommand(cmd, {exhaust: self.exhaust, raw:self.raw, read:this.read, connection:self.connection}, commandHandler);
    // Set the command handler to null
    commandHandler = null;
  } else if(self.items.length) {
    callback(null, self.items.shift());
  } else if(self.cursorId.greaterThan(Long.fromInt(0))) {
    getMore(self, callback);
  } else {
    // Force cursor to stay open
    return self.close(function() {callback(null, null);});
  }
}

/**
 * Gets more results from the database if any.
 *
 * @param {Function} callback this will be called after executing this method. The first parameter will contain an error object on error while the second parameter will contain a document from the returned result or null if there are no more results.
 * @ignore
 * @api private
 */
var getMore = function(self, callback) {
  var limit = 0;

  if (!self.tailable && self.limitValue > 0) {
    limit = self.limitValue - self.totalNumberOfRecords;
    if (limit < 1) {
      self.close(function() {callback(null, null);});
      return;
    }
  }
  try {
    var getMoreCommand = new GetMoreCommand(
        self.db
      , self.collectionName
      , limitRequest(self)
      , self.cursorId
    );

    // Set up options
    var options = {read: self.read, raw: self.raw, connection:self.connection };

    // Execute the command
    self.db._executeQueryCommand(getMoreCommand, options, function(err, result) {
      try {
        if(err != null) {
          return callback(err, null);
        }

        var isDead = 1 === result.responseFlag && result.cursorId.isZero();

        self.cursorId = result.cursorId;
        self.totalNumberOfRecords += result.numberReturned;

        // Determine if there's more documents to fetch
        if(result.numberReturned > 0) {
          if (self.limitValue > 0) {
            var excessResult = self.totalNumberOfRecords - self.limitValue;

            if (excessResult > 0) {
              result.documents.splice(-1 * excessResult, excessResult);
            }
          }

          // Reset the tries for awaitdata if we are using it
          self.currentNumberOfRetries = self.numberOfRetries;
          // Get the documents
          for(var i = 0; i < result.documents.length; i++) {
            self.items.push(result.documents[i]);
          }

          // result = null;
          callback(null, self.items.shift());
        } else if(self.tailable && !isDead && self.awaitdata) {
          // Excute the tailable cursor once more, will timeout after ~4 sec if awaitdata used
          self.currentNumberOfRetries = self.currentNumberOfRetries - 1;
          if(self.currentNumberOfRetries == 0) {
            self.close(function() {
              callback(new Error("tailable cursor timed out"), null);
            });
          } else {
            process.nextTick(function() { getMore(self, callback); });
          }
        } else if(self.tailable && !isDead) {
          self.getMoreTimer = setTimeout(function() { getMore(self, callback); }, self.tailableRetryInterval);
        } else {
          self.close(function() {callback(null, null); });
        }

        result = null;
      } catch(err) {
        callback(err, null);
      }
    });

    getMoreCommand = null;
  } catch(err) {
    var handleClose = function() {
      callback(err, null);
    };

    self.close(handleClose);
    handleClose = null;
  }
}

/**
 * Gets a detailed information about how the query is performed on this cursor and how
 * long it took the database to process it.
 *
 * @param {Function} callback this will be called after executing this method. The first parameter will always be null while the second parameter will be an object containing the details.
 * @api public
 */
Cursor.prototype.explain = function(callback) {
  var limit = (-1)*Math.abs(this.limitValue);

 // *  - **skip** {Number} skip number of documents to skip.
 // *  - **limit** {Number}, limit the number of results to return. -1 has a special meaning and is used by Db.eval. A value of 1 will also be treated as if it were -1.
 // *  - **hint**  {Object}, hint force the query to use a specific index.
 // *  - **explain** {Boolean}, explain return the explaination of the query.
 // *  - **slaveOk** {Boolean}, slaveOk, sets the slaveOk flag on the query wire protocol for secondaries.
 // *  - **snapshot** {Boolean}, snapshot Snapshot mode assures no duplicates are returned.
 // *  - **timeout** {Boolean}, timeout allow the query to timeout.
 // *  - **tailable** {Boolean}, tailable allow the cursor to be tailable.
 // *  - **awaitdata** {Boolean}, awaitdata allow the cursor to wait for data, only applicable for tailable cursor.
 // *  - **batchSize** {Number}, batchSize the number of the subset of results to request the database to return for every request. This should initially be greater than 1 otherwise the database will automatically close the cursor. The batch size can be set to 1 with cursorInstance.batchSize after performing the initial query to the database.
 // *  - **raw** {Boolean}, raw return all query documents as raw buffers (default false).
 // *  - **read** {Boolean}, read specify override of read from source (primary/secondary).
 // *  - **returnKey** {Boolean}, returnKey only return the index key.
 // *  - **maxScan** {Number}, maxScan limit the number of items to scan.
 // *  - **min** {Number}, min set index bounds.
 // *  - **max** {Number}, max set index bounds.
 // *  - **showDiskLoc** {Boolean}, showDiskLoc show disk location of results.
 // *  - **comment** {String}, comment you can put a $comment field on a query to make looking in the profiler logs simpler.
 // *  - **numberOfRetries** {Number}, numberOfRetries if using awaidata specifies the number of times to retry on timeout.
 // *  - **dbName** {String}, dbName override the default dbName.
 // *  - **tailableRetryInterval** {Number}, tailableRetryInterval specify the miliseconds between getMores on tailable cursor.
 // *  - **exhaust** {Boolean}, exhaust have the server send all the documents at once as getMore packets.
 // *  - **partial** {Boolean}, partial have the sharded system return a partial result from mongos.

 // *  - **sort** {Array | Object}, set to sort the documents coming back from the query. Array of indexes, [['a', 1]] etc.

// function Cursor(db, collection, selector, fields, skip, limit
// -  , sort, hint, explain, snapshot, timeout, tailable, batchSize, slaveOk, raw, read
// -  , returnKey, maxScan, min, max, showDiskLoc, comment, awaitdata, numberOfRetries, dbName, tailableRetry

  // Create a new cursor and fetch the plan
  var cursor = new Cursor(this.db, this.collection, this.selector, this.fields, {
      skip: this.skipValue
    , limit:limit
    , sort: this.sortValue
    , hint: this.hint
    , explain: true
    , snapshot: this.snapshot
    , timeout: this.timeout
    , tailable: this.tailable
    , batchSize: this.batchSizeValue
    , slaveOk: this.slaveOk
    , raw: this.raw
    , read: this.read
    , returnKey: this.returnKey
    , maxScan: this.maxScan
    , min: this.min
    , max: this.max
    , showDiskLoc: this.showDiskLoc
    , comment: this.comment
    , awaitdata: this.awaitdata
    , numberOfRetries: this.numberOfRetries
    , dbName: this.dbName
  });
  
  // Fetch the explaination document
  cursor.nextObject(function(err, item) {
    if(err != null) return callback(err, null);
    // close the cursor
    cursor.close(function(err, result) {
      if(err != null) return callback(err, null);
      callback(null, item);
    });
  });
};

/**
 * @ignore
 */
Cursor.prototype.streamRecords = function(options) {
  console.log("[WARNING] streamRecords method is deprecated, please use stream method which is much faster");
  var args = Array.prototype.slice.call(arguments, 0);
  options = args.length ? args.shift() : {};

  var
    self = this,
    stream = new process.EventEmitter(),
    recordLimitValue = this.limitValue || 0,
    emittedRecordCount = 0,
    queryCommand = generateQueryCommand(self);

  // see http://www.mongodb.org/display/DOCS/Mongo+Wire+Protocol
  queryCommand.numberToReturn = options.fetchSize ? options.fetchSize : 500;
  // Execute the query
  execute(queryCommand);

  function execute(command) {
    self.db._executeQueryCommand(command, {exhaust: self.exhaust, read:self.read, raw:self.raw, connection:self.connection}, function(err,result) {
      if(err) {
        stream.emit('error', err);
        self.close(function(){});
        return;
      }

      if (!self.queryRun && result) {
        self.queryRun = true;
        self.cursorId = result.cursorId;
        self.state = Cursor.OPEN;
        self.getMoreCommand = new GetMoreCommand(self.db, self.collectionName, queryCommand.numberToReturn, result.cursorId);
      }

      var resflagsMap = {
        CursorNotFound:1<<0,
        QueryFailure:1<<1,
        ShardConfigStale:1<<2,
        AwaitCapable:1<<3
      };

      if(result.documents && result.documents.length && !(result.responseFlag & resflagsMap.QueryFailure)) {
        try {
          result.documents.forEach(function(doc){
            if(recordLimitValue && emittedRecordCount>=recordLimitValue) {
              throw("done");
            }
            emittedRecordCount++;
            stream.emit('data', doc);
          });
        } catch(err) {
          if (err != "done") { throw err; }
          else {
            self.close(function(){
              stream.emit('end', recordLimitValue);
            });
            self.close(function(){});
            return;
          }
        }
        // rinse & repeat
        execute(self.getMoreCommand);
      } else {
        self.close(function(){
          stream.emit('end', recordLimitValue);
        });
      }
    });
  }

  return stream;
};

/**
 * Returns a Node ReadStream interface for this cursor.
 *
 * @return {CursorStream} returns a stream object.
 * @api public
 */
Cursor.prototype.stream = function stream () {
  return new CursorStream(this);
}

/**
 * Close the cursor.
 *
 * @param {Function} callback this will be called after executing this method. The first parameter will always contain null while the second parameter will contain a reference to this cursor.
 * @return {null}
 * @api public
 */
Cursor.prototype.close = function(callback) {
  var self = this
  this.getMoreTimer && clearTimeout(this.getMoreTimer);
  // Close the cursor if not needed
  if(this.cursorId instanceof Long && this.cursorId.greaterThan(Long.fromInt(0))) {
    try {
      var command = new KillCursorCommand(this.db, [this.cursorId]);
      // Added an empty callback to ensure we don't throw any null exceptions
      this.db._executeQueryCommand(command, {read:self.read, raw:self.raw, connection:self.connection}, function() {});
    } catch(err) {}
  }

  // Null out the connection
  self.connection = null;
  // Reset cursor id
  this.cursorId = Long.fromInt(0);
  // Set to closed status
  this.state = Cursor.CLOSED;

  if(callback) {
    callback(null, self);
    self.items = [];
  }

  return this;
};

/**
 * Check if the cursor is closed or open.
 *
 * @return {Boolean} returns the state of the cursor.
 * @api public
 */
Cursor.prototype.isClosed = function() {
  return this.state == Cursor.CLOSED ? true : false;
};

/**
 * Init state
 *
 * @classconstant INIT
 **/
Cursor.INIT = 0;

/**
 * Cursor open
 *
 * @classconstant OPEN
 **/
Cursor.OPEN = 1;

/**
 * Cursor closed
 *
 * @classconstant CLOSED
 **/
Cursor.CLOSED = 2;

/**
 * @ignore
 * @api private
 */
exports.Cursor =  Cursor;
