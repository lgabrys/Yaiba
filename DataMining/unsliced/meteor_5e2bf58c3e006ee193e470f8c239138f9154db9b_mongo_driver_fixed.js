/**
 * Provide a synchronous Collection API using fibers, backed by
 * MongoDB.  This is only for use on the server, and mostly identical
 * to the client API.
 *
 * NOTE: the public API methods must be run within a fiber. If you call
 * these outside of a fiber they will explode!
 */

var path = Npm.require('path');
var MongoDB = Npm.require('mongodb');
var Fiber = Npm.require('fibers');
var Future = Npm.require(path.join('fibers', 'future'));

var replaceNames = function (filter, thing) {
  if (typeof thing === "object") {
    if (_.isArray(thing)) {
      return _.map(thing, _.bind(replaceNames, null, filter));
    }
    var ret = {};
    _.each(thing, function (value, key) {
      ret[filter(key)] = replaceNames(filter, value);
    });
    return ret;
  }
  return thing;
};

var makeMongoLegal = function (name) { return "EJSON" + name; };
var unmakeMongoLegal = function (name) { return name.substr(5); };

var replaceMongoAtomWithMeteor = function (document) {
  if (document instanceof MongoDB.Binary) {
    var buffer = document.value(true);
    return new Uint8Array(buffer);
  }
  if (document instanceof MongoDB.ObjectID) {
    return new Meteor.Collection.ObjectID(document.toHexString());
  }
  if (document["EJSON$type"] && document["EJSON$value"]) {
    return EJSON.fromJSONValue(replaceNames(unmakeMongoLegal, document));
  }
  return undefined;
};

var replaceMeteorAtomWithMongo = function (document) {
  if (EJSON.isBinary(document)) {
    // This does more copies than we'd like, but is necessary because
    // MongoDB.BSON only looks like it takes a Uint8Array (and doesn't actually
    // serialize it correctly).
    return new MongoDB.Binary(new Buffer(document));
  }
  if (document instanceof Meteor.Collection.ObjectID) {
    return new MongoDB.ObjectID(document.toHexString());
  } else if (EJSON._isCustomType(document)) {
    return replaceNames(makeMongoLegal, EJSON.toJSONValue(document));
  }
  // It is not ordinarily possible to stick dollar-sign keys into mongo
  // so we don't bother checking for things that need escaping at this time.
  return undefined;
};

var replaceTypes = function (document, atomTransformer) {
  if (typeof document !== 'object' || document === null)
    return document;

  var replacedTopLevelAtom = atomTransformer(document);
  if (replacedTopLevelAtom !== undefined)
    return replacedTopLevelAtom;

  var ret = document;
  _.each(document, function (val, key) {
    var valReplaced = replaceTypes(val, atomTransformer);
    if (val !== valReplaced) {
      // Lazy clone. Shallow copy.
      if (ret === document)
        ret = _.clone(document);
      ret[key] = valReplaced;
    }
  });
  return ret;
};


_Mongo = function (url) {
  var self = this;
  self.collection_queue = [];
  self._liveResultsSets = {};

  var options = {db: {safe: true}};

  // Set autoReconnect to true, unless passed on the URL. Why someone
  // would want to set autoReconnect to false, I'm not really sure, but
  // keeping this for backwards compatibility for now.
  if (!(/[\?&]auto_?[rR]econnect=/.test(url))) {
    options.server = {auto_reconnect: true};
  }

  // Disable the native parser by default, unless specifically enabled
  // in the mongo URL.
  // - The native driver can cause errors which normally would be
  //   thrown, caught, and handled into segfaults that take down the
  //   whole app.
  // - Binary modules don't yet work when you bundle and move the bundle
  //   to a different platform (aka deploy)
  // We should revisit this after binary npm module support lands.
  if (!(/[\?&]native_?[pP]arser=/.test(url))) {
    options.db.native_parser = false;
  }

  MongoDB.connect(url, options, function(err, db) {
    if (err)
      throw err;
    self.db = db;

    // drain queue of pending callbacks
    var c;
    while ((c = self.collection_queue.pop())) {
      Fiber(function () {
        db.collection(c.name, c.callback);
      }).run();
    }
  });
};

_Mongo.prototype.close = function() {
  var self = this;
  // Use Future.wrap so that errors get thrown. This happens to
  // work even outside a fiber since the 'close' method is not
  // actually asynchronous.
  Future.wrap(_.bind(self.db.close, self.db))(true).wait();
};

// Returns the Mongo Collection object; may yield.
_Mongo.prototype._getCollection = function(collectionName) {
  var self = this;

  var future = new Future;
  if (self.db) {
    self.db.collection(collectionName, future.resolver());
  } else {
    self.collection_queue.push({name: collectionName,
                                callback: future.resolver()});
  }
  return future.wait();
};

// This should be called synchronously with a write, to create a
// transaction on the current write fence, if any. After we can read
// the write, and after observers have been notified (or at least,
// after the observer notifiers have added themselves to the write
// fence), you should call 'committed()' on the object returned.
_Mongo.prototype._maybeBeginWrite = function () {
  var self = this;
  var fence = Meteor._CurrentWriteFence.get();
  if (fence)
    return fence.beginWrite();
  else
    return {committed: function () {}};
};

//////////// Public API //////////

// The write methods block until the database has confirmed the write
// (it may not be replicated or stable on disk, but one server has
// confirmed it.) (In the future we might have an option to turn this
// off, ie, to enqueue the request on the wire and return
// immediately.)  They return nothing on success, and raise an
// exception on failure.
//
// After making a write (with insert, update, remove), observers are
// notified asynchronously. If you want to receive a callback once all
// of the observer notifications have landed for your write, do the
// writes inside a write fence (set Meteor._CurrentWriteFence to a new
// _WriteFence, and then set a callback on the write fence.)
//
// Since our execution environment is single-threaded, this is
// well-defined -- a write "has been made" if it's returned, and an
// observer "has been notified" if its callback has returned.

_Mongo.prototype.insert = function (collection_name, document) {
  var self = this;
  if (collection_name === "___meteor_failure_test_collection") {
    var e = new Error("Failure test");
    e.expected = true;
    throw e;
  }

  var write = self._maybeBeginWrite();

  try {
    var collection = self._getCollection(collection_name);
    var future = new Future;
    collection.insert(replaceTypes(document, replaceMeteorAtomWithMongo),
                      {safe: true}, future.resolver());
    future.wait();
    // XXX We don't have to run this on error, right?
    Meteor.refresh({collection: collection_name, id: document._id});
  } finally {
    write.committed();
  }
};

// Cause queries that may be affected by the selector to poll in this write
// fence.
_Mongo.prototype._refresh = function (collectionName, selector) {
  var self = this;
  var refreshKey = {collection: collectionName};
  // If we know which documents we're removing, don't poll queries that are
  // specific to other documents. (Note that multiple notifications here should
  // not cause multiple polls, since all our listener is doing is enqueueing a
  // poll.)
  var specificIds = LocalCollection._idsMatchedBySelector(selector);
  if (specificIds) {
    _.each(specificIds, function (id) {
      Meteor.refresh(_.extend({id: id}, refreshKey));
    });
  } else {
    Meteor.refresh(refreshKey);
  }
};

_Mongo.prototype.remove = function (collection_name, selector) {
  var self = this;

  if (collection_name === "___meteor_failure_test_collection") {
    var e = new Error("Failure test");
    e.expected = true;
    throw e;
  }

  var write = self._maybeBeginWrite();

  try {
    var collection = self._getCollection(collection_name);
    var future = new Future;
    collection.remove(replaceTypes(selector, replaceMeteorAtomWithMongo),
                      {safe: true}, future.resolver());
    future.wait();
    // XXX We don't have to run this on error, right?
    self._refresh(collection_name, selector);
  } finally {
    write.committed();
  }
};

_Mongo.prototype.update = function (collection_name, selector, mod, options) {
  var self = this;

  if (collection_name === "___meteor_failure_test_collection") {
    var e = new Error("Failure test");
    e.expected = true;
    throw e;
  }

  // explicit safety check. null and undefined can crash the mongo
  // driver. Although the node driver and minimongo do 'support'
  // non-object modifier in that they don't crash, they are not
  // meaningful operations and do not do anything. Defensively throw an
  // error here.
  if (!mod || typeof mod !== 'object')
    throw new Error("Invalid modifier. Modifier must be an object.");

  if (!options) options = {};

  var write = self._maybeBeginWrite();
  try {
    var collection = self._getCollection(collection_name);
    var mongoOpts = {safe: true};
    // explictly enumerate options that minimongo supports
    if (options.upsert) mongoOpts.upsert = true;
    if (options.multi) mongoOpts.multi = true;
    var future = new Future;
    collection.update(replaceTypes(selector, replaceMeteorAtomWithMongo),
                      replaceTypes(mod, replaceMeteorAtomWithMongo),
                      mongoOpts, future.resolver());
    future.wait();
    self._refresh(collection_name, selector);
  } finally {
    write.committed();
  }
};

_Mongo.prototype.find = function (collectionName, selector, options) {
  var self = this;

  if (arguments.length === 1)
    selector = {};

  return new Cursor(
    self, new CursorDescription(collectionName, selector, options));
};

_Mongo.prototype.findOne = function (collection_name, selector, options) {
  var self = this;
  if (arguments.length === 1)
    selector = {};

  // XXX use limit=1 instead?
  return self.find(collection_name, selector, options).fetch()[0];
};

// We'll actually design an index API later. For now, we just pass through to
// Mongo's, but make it synchronous.
_Mongo.prototype._ensureIndex = function (collectionName, index, options) {
  var self = this;
  options = _.extend({safe: true}, options);

  // We expect this function to be called at startup, not from within a method,
  // so we don't interact with the write fence.
  var collection = self._getCollection(collectionName);
  var future = new Future;
  var indexName = collection.ensureIndex(index, options, future.resolver());
  future.wait();
};
_Mongo.prototype._dropIndex = function (collectionName, index) {
  var self = this;

  // This function is only used by test code, not within a method, so we don't
  // interact with the write fence.
  var collection = self._getCollection(collectionName);
  var future = new Future;
  var indexName = collection.dropIndex(index, future.resolver());
  future.wait();
};

// CURSORS

// There are several classes which relate to cursors:
//
// CursorDescription represents the arguments used to construct a cursor:
// collectionName, selector, and (find) options.  Because it is used as a key
// for cursor de-dup, everything in it should either be JSON-stringifiable or
// not affect observeChanges output (eg, options.transform functions are not
// stringifiable but do not affect observeChanges).
//
// SynchronousCursor is a wrapper around a MongoDB cursor
// which includes fully-synchronous versions of forEach, etc.
//
// Cursor is the cursor object returned from find(), which implements the
// documented Meteor.Collection cursor API.  It wraps a CursorDescription and a
// SynchronousCursor (lazily: it doesn't contact Mongo until you call a method
// like fetch or forEach on it).
//
// ObserveHandle is the "observe handle" returned from observeChanges. It has a
// reference to a LiveResultsSet.
//
// LiveResultsSet caches the results of a query and reruns it when necessary.
// It is hooked up to one or more ObserveHandles; a single LiveResultsSet
// can drive multiple sets of observation callbacks if they are for the
// same query.


var CursorDescription = function (collectionName, selector, options) {
  var self = this;
  self.collectionName = collectionName;
  self.selector = Meteor.Collection._rewriteSelector(selector);
  self.options = options || {};
};

var Cursor = function (mongo, cursorDescription) {
  var self = this;

  self._mongo = mongo;
  self._cursorDescription = cursorDescription;
  self._synchronousCursor = null;
};

_.each(['forEach', 'map', 'rewind', 'fetch', 'count'], function (method) {
  Cursor.prototype[method] = function () {
    var self = this;

    // You can only observe a tailable cursor.
    if (self._cursorDescription.options.tailable)
      throw new Error("Cannot call " + method + " on a tailable cursor");

    if (!self._synchronousCursor)
      self._synchronousCursor = self._mongo._createSynchronousCursor(
        self._cursorDescription, true);

    return self._synchronousCursor[method].apply(
      self._synchronousCursor, arguments);
  };
});

Cursor.prototype.getTransform = function () {
  var self = this;
  return self._cursorDescription.options.transform;
};

// When you call Meteor.publish() with a function that returns a Cursor, we need
// to transmute it into the equivalent subscription.  This is the function that
// does that.

Cursor.prototype._publishCursor = function (sub) {
  var self = this;
  var collection = self._cursorDescription.collectionName;
  return Meteor.Collection._publishCursor(self, sub, collection);
};

// Used to guarantee that publish functions return at most one cursor per
// collection. Private, because we might later have cursors that include
// documents from multiple collections somehow.
Cursor.prototype._getCollectionName = function () {
  var self = this;
  return self._cursorDescription.collectionName;
}

Cursor.prototype.observe = function (callbacks) {
  var self = this;
  return LocalCollection._observeFromObserveChanges(self, callbacks);
};

Cursor.prototype.observeChanges = function (callbacks) {
  var self = this;
  var ordered = LocalCollection._isOrderedChanges(callbacks);
  return self._mongo._observeChanges(
    self._cursorDescription, ordered, callbacks);
};

_Mongo.prototype._createSynchronousCursor = function (cursorDescription,
                                                      useTransform) {
  var self = this;

  var collection = self._getCollection(cursorDescription.collectionName);
  var options = cursorDescription.options;
  var mongoOptions = {
    sort: options.sort,
    limit: options.limit,
    skip: options.skip
  };

  // Do we want a tailable cursor (which only works on capped collections)?
  if (options.tailable) {
    // We want a tailable cursor...
    mongoOptions.tailable = true;
    // ... and for the server to wait a bit if any getMore has no data (rather
    // than making us put the relevant sleeps in the client)...
    mongoOptions.awaitdata = true;
    // ... and to keep querying the server indefinitely rather than just 5 times
    // if there's no more data.
    mongoOptions.numberOfRetries = -1;
  }

  var dbCursor = collection.find(
    replaceTypes(cursorDescription.selector, replaceMeteorAtomWithMongo),
    options.fields, mongoOptions);

  return new SynchronousCursor(dbCursor, cursorDescription);
};

var SynchronousCursor = function (dbCursor, cursorDescription) {
  var self = this;
  self._dbCursor = dbCursor;
  self._cursorDescription = cursorDescription;

  if (cursorDescription.options.transform)
    self._transform = Deps._makeNonreactive(
      cursorDescription.options.transform);
  else
    self._transform = null;

  // Need to specify that the callback is the first argument to nextObject,
  // since otherwise when we try to call it with no args the driver will
  // interpret "undefined" first arg as an options hash and crash.
  self._synchronousNextObject = Future.wrap(
    dbCursor.nextObject.bind(dbCursor), 0);
  self._synchronousCount = Future.wrap(dbCursor.count.bind(dbCursor));
  self._visitedIds = {};
};

_.extend(SynchronousCursor.prototype, {
  _nextObject: function () {
    var self = this;
    while (true) {
      var doc = self._synchronousNextObject().wait();
      if (!doc || !doc._id) return null;
      doc = replaceTypes(doc, replaceMongoAtomWithMeteor);

      if (!self._cursorDescription.options.tailable) {
        // Did Mongo give us duplicate documents in the same cursor? If so,
        // ignore this one. (Do this before the transform, since transform might
        // return some unrelated value.) We don't do this for tailable cursors,
        // because we want to maintain O(1) memory usage.
        var strId = Meteor.idStringify(doc._id);
        if (self._visitedIds[strId]) continue;
        self._visitedIds[strId] = true;
      }

      if (self._transform)
        doc = self._transform(doc);

      return doc;
    }
  },

  // XXX Make more like ECMA forEach:
  //     https://github.com/meteor/meteor/pull/63#issuecomment-5320050
  forEach: function (callback) {
    var self = this;

    // We implement the loop ourself instead of using self._dbCursor.each,
    // because "each" will call its callback outside of a fiber which makes it
    // much more complex to make this function synchronous.
    while (true) {
      var doc = self._nextObject();
      if (!doc) return;
      callback(doc);
    }
  },

  // XXX Make more like ECMA map:
  //     https://github.com/meteor/meteor/pull/63#issuecomment-5320050
  // XXX Allow overlapping callback executions if callback yields.
  map: function (callback) {
    var self = this;
    var res = [];
    self.forEach(function (doc) {
      res.push(callback(doc));
    });
    return res;
  },

  rewind: function () {
    var self = this;

    // known to be synchronous
    self._dbCursor.rewind();

    self._visitedIds = {};
  },

  // Mostly usable for tailable cursors.
  close: function () {
    var self = this;

    self._dbCursor.close();
  },

  fetch: function () {
    var self = this;
    return self.map(_.identity);
  },

  count: function () {
    var self = this;
    return self._synchronousCount().wait();
  },

  // This method is NOT wrapped in Cursor.
  getRawObjects: function (ordered) {
    var self = this;
    if (ordered) {
      return self.fetch();
    } else {
      var results = {};
      self.forEach(function (doc) {
        results[doc._id] = doc;
      });
      return results;
    }
  }
});

var nextObserveHandleId = 1;
var ObserveHandle = function (liveResultsSet, callbacks) {
  var self = this;
  self._liveResultsSet = liveResultsSet;
  self._added = callbacks.added;
  self._addedBefore = callbacks.addedBefore;
  self._changed = callbacks.changed;
  self._removed = callbacks.removed;
  self._moved = callbacks.moved;
  self._movedBefore = callbacks.movedBefore;
  self._observeHandleId = nextObserveHandleId++;
};
ObserveHandle.prototype.stop = function () {
  var self = this;
  self._liveResultsSet._removeObserveHandle(self);
  self._liveResultsSet = null;
};

_Mongo.prototype._observeChanges = function (
    cursorDescription, ordered, callbacks) {
  var self = this;

  if (cursorDescription.options.tailable) {
    return self._observeChangesTailable(cursorDescription, ordered, callbacks);
  }

  var observeKey = JSON.stringify(
    _.extend({ordered: ordered}, cursorDescription));

  var liveResultsSet;
  var observeHandle;
  var newlyCreated = false;

  // Find a matching LiveResultsSet, or create a new one. This next block is
  // guaranteed to not yield (and it doesn't call anything that can observe a
  // new query), so no other calls to this function can interleave with it.
  Meteor._noYieldsAllowed(function () {
    if (_.has(self._liveResultsSets, observeKey)) {
      liveResultsSet = self._liveResultsSets[observeKey];
    } else {
      // Create a new LiveResultsSet. It is created "locked": no polling can
      // take place.
      liveResultsSet = new LiveResultsSet(
        cursorDescription,
        self,
        ordered,
        function () {
          delete self._liveResultsSets[observeKey];
        },
        callbacks._testOnlyPollCallback);
      self._liveResultsSets[observeKey] = liveResultsSet;
      newlyCreated = true;
    }
    observeHandle = new ObserveHandle(liveResultsSet, callbacks);
  });

  if (newlyCreated) {
    // This is the first ObserveHandle on this LiveResultsSet.  Add it and run
    // the initial synchronous poll (which may yield).
    liveResultsSet._addFirstObserveHandle(observeHandle);
  } else {
    // Not the first ObserveHandle. Add it to the LiveResultsSet. This call
    // yields until we're not in the middle of a poll, and its invocation of the
    // initial 'added' callbacks may yield as well. It blocks until the 'added'
    // callbacks have fired.
    liveResultsSet._addObserveHandleAndSendInitialAdds(observeHandle);
  }

  return observeHandle;
};

var LiveResultsSet = function (cursorDescription, mongoHandle, ordered,
                               stopCallback, testOnlyPollCallback) {
  var self = this;

  self._cursorDescription = cursorDescription;
  self._mongoHandle = mongoHandle;
  self._ordered = ordered;
  self._stopCallbacks = [stopCallback];

  // This constructor cannot yield, so we don't create the synchronousCursor yet
  // (since that can yield).
  self._synchronousCursor = null;

  // previous results snapshot.  on each poll cycle, diffs against
  // results drives the callbacks.
  self._results = ordered ? [] : {};

  // The number of _pollMongo calls that have been added to self._taskQueue but
  // have not started running. Used to make sure we never schedule more than one
  // _pollMongo (other than possibly the one that is currently running). It's
  // also used by _suspendPolling to pretend there's a poll scheduled. Usually,
  // it's either 0 (for "no polls scheduled other than maybe one currently
  // running") or 1 (for "a poll scheduled that isn't running yet"), but it can
  // also be 2 if incremented by _suspendPolling.
  self._pollsScheduledButNotStarted = 0;
  // Number of _addObserveHandleAndSendInitialAdds tasks scheduled but not yet
  // running. _removeObserveHandle uses this to know if it's safe to shut down
  // this LiveResultsSet.
  self._addHandleTasksScheduledButNotPerformed = 0;
  self._pendingWrites = []; // people to notify when polling completes

  // Make sure to create a separately throttled function for each LiveResultsSet
  // object.
  self._ensurePollIsScheduled = _.throttle(
    self._unthrottledEnsurePollIsScheduled, 50 /* ms */);

  self._taskQueue = new Meteor._SynchronousQueue();

  // Listen for the invalidation messages that will trigger us to poll the
  // database for changes. If this selector specifies specific IDs, specify them
  // here, so that updates to different specific IDs don't cause us to poll.
  var listenOnTrigger = function (trigger) {
    var listener = Meteor._InvalidationCrossbar.listen(
      trigger, function (notification, complete) {
        // When someone does a transaction that might affect us, schedule a poll
        // of the database. If that transaction happens inside of a write fence,
        // block the fence until we've polled and notified observers.
        var fence = Meteor._CurrentWriteFence.get();
        if (fence)
          self._pendingWrites.push(fence.beginWrite());
        // Ensure a poll is scheduled... but if we already know that one is,
        // don't hit the throttled _ensurePollIsScheduled function (which might
        // lead to us calling it unnecessarily in 50ms).
        if (self._pollsScheduledButNotStarted === 0)
          self._ensurePollIsScheduled();
        complete();
      });
    self._stopCallbacks.push(function () { listener.stop(); });
  };
  var key = {collection: cursorDescription.collectionName};
  var specificIds = LocalCollection._idsMatchedBySelector(
    cursorDescription.selector);
  if (specificIds) {
    _.each(specificIds, function (id) {
      listenOnTrigger(_.extend({id: id}, key));
    });
  } else {
    listenOnTrigger(key);
  }

  // Map from handle ID to ObserveHandle.
  self._observeHandles = {};

  self._callbackMultiplexer = {};
  var callbackNames = ['added', 'changed', 'removed'];
  if (self._ordered) {
    callbackNames.push('moved');
    callbackNames.push('addedBefore');
    callbackNames.push('movedBefore');
  }
  _.each(callbackNames, function (callback) {
    var handleCallback = '_' + callback;
    self._callbackMultiplexer[callback] = function () {
      var args = _.toArray(arguments);
      // Because callbacks can yield and _removeObserveHandle() (ie,
      // handle.stop()) doesn't synchronize its actions with _taskQueue,
      // ObserveHandles can disappear from self._observeHandles during this
      // dispatch. Thus, we save a copy of the keys of self._observeHandles
      // before we start to iterate, and we check to see if the handle is still
      // there each time.
      _.each(_.keys(self._observeHandles), function (handleId) {
        var handle = self._observeHandles[handleId];
        if (handle && handle[handleCallback])
          handle[handleCallback].apply(null, EJSON.clone(args));
      });
    };
  });

  // every once and a while, poll even if we don't think we're dirty, for
  // eventual consistency with database writes from outside the Meteor
  // universe.
  //
  // For testing, there's an undocumented callback argument to observeChanges
  // which disables time-based polling and gets called at the beginning of each
  // poll.
  if (testOnlyPollCallback) {
    self._testOnlyPollCallback = testOnlyPollCallback;
  } else {
    var intervalHandle = Meteor.setInterval(
      _.bind(self._ensurePollIsScheduled, self), 10 * 1000);
    self._stopCallbacks.push(function () {
      Meteor.clearInterval(intervalHandle);
    });
  }
};

_.extend(LiveResultsSet.prototype, {
  _addFirstObserveHandle: function (handle) {
    var self = this;
    if (! _.isEmpty(self._observeHandles))
      throw new Error("Not the first observe handle!");
    if (! _.isEmpty(self._results))
      throw new Error("Call _addFirstObserveHandle before polling!");

    self._observeHandles[handle._observeHandleId] = handle;

    // Run the first _poll() cycle synchronously (delivering results to the
    // first ObserveHandle).
    ++self._pollsScheduledButNotStarted;
    self._taskQueue.runTask(function () {
      self._pollMongo();
    });
  },

  // This is always called through _.throttle.
  _unthrottledEnsurePollIsScheduled: function () {
    var self = this;
    if (self._pollsScheduledButNotStarted > 0)
      return;
    ++self._pollsScheduledButNotStarted;
    self._taskQueue.queueTask(function () {
      self._pollMongo();
    });
  },

  // test-only interface for controlling polling.
  //
  // _suspendPolling blocks until any currently running and scheduled polls are
  // done, and prevents any further polls from being scheduled. (new
  // ObserveHandles can be added and receive their initial added callbacks,
  // though.)
  //
  // _resumePolling immediately polls, and allows further polls to occur.
  _suspendPolling: function() {
    var self = this;
    // Pretend that there's another poll scheduled (which will prevent
    // _ensurePollIsScheduled from queueing any more polls).
    ++self._pollsScheduledButNotStarted;
    // Now block until all currently running or scheduled polls are done.
    self._taskQueue.runTask(function() {});

    // Confirm that there is only one "poll" (the fake one we're pretending to
    // have) scheduled.
    if (self._pollsScheduledButNotStarted !== 1)
      throw new Error("_pollsScheduledButNotStarted is " +
                      self._pollsScheduledButNotStarted);
  },
  _resumePolling: function() {
    var self = this;
    // We should be in the same state as in the end of _suspendPolling.
    if (self._pollsScheduledButNotStarted !== 1)
      throw new Error("_pollsScheduledButNotStarted is " +
                      self._pollsScheduledButNotStarted);
    // Run a poll synchronously (which will counteract the
    // ++_pollsScheduledButNotStarted from _suspendPolling).
    self._taskQueue.runTask(function () {
      self._pollMongo();
    });
  },

  _pollMongo: function () {
    var self = this;
    --self._pollsScheduledButNotStarted;

    self._testOnlyPollCallback && self._testOnlyPollCallback();

    // Save the list of pending writes which this round will commit.
    var writesForCycle = self._pendingWrites;
    self._pendingWrites = [];

    // Get the new query results. (These calls can yield.)
    if (self._synchronousCursor) {
      self._synchronousCursor.rewind();
    } else {
      self._synchronousCursor = self._mongoHandle._createSynchronousCursor(
        self._cursorDescription, false /* !useTransform */);
    }
    var newResults = self._synchronousCursor.getRawObjects(self._ordered);
    var oldResults = self._results;

    // Run diffs. (This can yield too.)
    if (!_.isEmpty(self._observeHandles)) {
      LocalCollection._diffQueryChanges(
        self._ordered, oldResults, newResults, self._callbackMultiplexer);
    }

    // Replace self._results atomically.
    self._results = newResults;

    // Mark all the writes which existed before this call as commmitted. (If new
    // writes have shown up in the meantime, there'll already be another
    // _pollMongo task scheduled.)
    _.each(writesForCycle, function (w) {w.committed();});
  },

  // Adds the observe handle to this set and sends its initial added
  // callbacks. Meteor._SynchronousQueue guarantees that this won't interleave
  // with a call to _pollMongo or another call to this function.
  _addObserveHandleAndSendInitialAdds: function (handle) {
    var self = this;

    // Check this before calling runTask (even though runTask does the same
    // check) so that we don't leak a LiveResultsSet by incrementing
    // _addHandleTasksScheduledButNotPerformed and never decrementing it.
    if (!self._taskQueue.safeToRunTask())
      throw new Error(
        "Can't call observe() from an observe callback on the same query");

    // Keep track of how many of these tasks are on the queue, so that
    // _removeObserveHandle knows if it's safe to GC.
    ++self._addHandleTasksScheduledButNotPerformed;

    self._taskQueue.runTask(function () {
      if (!self._observeHandles)
        throw new Error("Can't add observe handle to stopped LiveResultsSet");

      if (_.has(self._observeHandles, handle._observeHandleId))
        throw new Error("Duplicate observe handle ID");
      self._observeHandles[handle._observeHandleId] = handle;
      --self._addHandleTasksScheduledButNotPerformed;

      // Send initial adds.
      if (handle._added || handle._addedBefore) {
        _.each(self._results, function (doc, i) {
          var fields = EJSON.clone(doc);
          delete fields._id;
          if (self._ordered) {
            handle._added && handle._added(doc._id, fields);
            handle._addedBefore && handle._addedBefore(doc._id, fields, null);
          } else {
            handle._added(doc._id, fields);
          }
        });
      }
    });
  },

  // Remove an observe handle. If it was the last observe handle, call all the
  // stop callbacks; you cannot add any more observe handles after this.
  //
  // This is not synchronized with polls and handle additions: this means that
  // you can safely call it from within an observe callback.
  _removeObserveHandle: function (handle) {
    var self = this;

    if (!_.has(self._observeHandles, handle._observeHandleId))
      throw new Error("Unknown observe handle ID " + handle._observeHandleId);
    delete self._observeHandles[handle._observeHandleId];

    if (_.isEmpty(self._observeHandles) &&
        self._addHandleTasksScheduledButNotPerformed === 0) {
      // The last observe handle was stopped; call our stop callbacks, which:
      //  - removes us from the _Mongo's _liveResultsSets map
      //  - stops the poll timer
      //  - removes us from the invalidation crossbar
      _.each(self._stopCallbacks, function (c) { c(); });
      // This will cause future _addObserveHandleAndSendInitialAdds calls to
      // throw.
      self._observeHandles = null;
    }
  }
});

_Mongo.prototype._observeChangesTailable = function (
    cursorDescription, ordered, callbacks) {
  var self = this;

  // Tailable cursors only ever call added/addedBefore callbacks, so it's an
  // error if you didn't provide them.
  if ((ordered && !callbacks.addedBefore) ||
      (!ordered && !callbacks.added)) {
    throw new Error("Can't observe an " + (ordered ? "ordered" : "unordered")
                    + " tailable cursor without a "
                    + (ordered ? "addedBefore" : "added") + " callback");
  }
  var cursor = self._createSynchronousCursor(cursorDescription);

  var stopped = false;
  var lastTS = undefined;
  Meteor.defer(function () {
    while (true) {
      if (stopped)
        return;
      try {
        var doc = cursor._nextObject();
      } catch (err) {
        // There's no good way to figure out if this was actually an error from
        // Mongo. Ah well. But either way, we need to retry the cursor (unless
        // the failure was because the observe got stopped).
        doc = null;
      }
      if (stopped)
        return;
      if (doc) {
        var id = doc._id;
        delete doc._id;
        // If a tailable cursor contains a "ts" field, use it to recreate the
        // cursor on error, and don't publish the field. ("ts" is a standard
        // that Mongo uses internally for the oplog, and there's a special flag
        // that lets you do binary search on it instead of needing to use an
        // index.)
        lastTS = doc.ts;
        delete doc.ts;
        if (ordered) {
          callbacks.addedBefore(id, doc, null);
        } else {
          callbacks.added(id, doc);
        }
      } else {
        var newSelector = _.clone(cursorDescription.selector);
        if (lastTS) {
          newSelector.ts = {$gt: lastTS};
        }
        // XXX maybe set replay flag
        cursor = self._createSynchronousCursor(new CursorDescription(
          cursorDescription.collectionName,
          newSelector,
          cursorDescription.options));
      }
    }
  });

  return {
    stop: function () {
      stopped = true;
      cursor.close();
    }
  };
};

_.extend(Meteor, {
  _Mongo: _Mongo
});
Meteor._Mongo._Timestamp = MongoDB.Timestamp;
