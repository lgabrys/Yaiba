'use strict';

const MongoError = require('../core').MongoError;
const Aspect = require('./operation').Aspect;
const OperationBase = require('./operation').OperationBase;
const ReadPreference = require('../core').ReadPreference;
const isRetryableError = require('../core/error').isRetryableError;
const maxWireVersion = require('../core/utils').maxWireVersion;

/**
 * Executes the given operation with provided arguments.
 *
 * This method reduces large amounts of duplication in the entire codebase by providing
 * a single point for determining whether callbacks or promises should be used. Additionally
 * it allows for a single point of entry to provide features such as implicit sessions, which
 * are required by the Driver Sessions specification in the event that a ClientSession is
 * not provided
 *
 * @param {object} topology The topology to execute this operation on
 * @param {Operation} operation The operation to execute
 * @param {function} callback The command result callback
 */
function executeOperation(topology, operation, callback) {
  if (topology == null) {
    throw new TypeError('This method requires a valid topology instance');
  }

  if (!(operation instanceof OperationBase)) {
    throw new TypeError('This method requires a valid operation instance');
  }

  const Promise = topology.s.promiseLibrary;

  // The driver sessions spec mandates that we implicitly create sessions for operations
  // that are not explicitly provided with a session.
  let session, owner;
  if (!operation.hasAspect(Aspect.SKIP_SESSION) && topology.hasSessionSupport()) {
    if (operation.session == null) {
      owner = Symbol();
      session = topology.startSession({ owner });
      operation.session = session;
    } else if (operation.session.hasEnded) {
      throw new MongoError('Use of expired sessions is not permitted');
    }
  }

  const makeExecuteCallback = (resolve, reject) =>
    function executeCallback(err, result) {
      if (session && session.owner === owner) {
        session.endSession(() => {
          if (operation.session === session) {
            operation.clearSession();
          }
          if (err) return reject(err);
          resolve(result);
        });
      } else {
        if (err) return reject(err);
        resolve(result);
      }
    };

  // Execute using callback
  if (typeof callback === 'function') {
    const handler = makeExecuteCallback(
      result => callback(null, result),
      err => callback(err, null)
    );

    try {
      if (operation.hasAspect(Aspect.EXECUTE_WITH_SELECTION)) {
        return executeWithServerSelection(topology, operation, handler);
      } else {
        return operation.execute(handler);
      }
    } catch (e) {
      handler(e);
      throw e;
    }
  }

  return new Promise(function(resolve, reject) {
    const handler = makeExecuteCallback(resolve, reject);

    try {
      if (operation.hasAspect(Aspect.EXECUTE_WITH_SELECTION)) {
        return executeWithServerSelection(topology, operation, handler);
      } else {
        return operation.execute(handler);
      }
    } catch (e) {
      handler(e);
    }
  });
}

function executeWithServerSelection(topology, operation, callback) {
  const readPreference = operation.readPreference || ReadPreference.primary;

  function callbackWithRetry(err, result) {
    if (err == null) {
      return callback(null, result);
    }

    if (!isRetryableError(err)) {
      return callback(err);
    }

    // select a new server, and attempt to retry the operation
    topology.selectServer(readPreference, (err, server) => {
      if (err) {
        callback(err, null);
        return;
      }

      operation.execute(server, callback);
    });
  }

  // select a server, and execute the operation against it
  topology.selectServer(readPreference, (err, server) => {
    if (err) {
      callback(err, null);
      return;
    }

    const shouldRetryReads =
      topology.s.options.retryReads !== false &&
      (operation.session && !operation.session.inTransaction()) &&
      maxWireVersion(server) >= 6;

    if (operation.hasAspect(Aspect.RETRYABLE) && shouldRetryReads) {
      operation.execute(server, callbackWithRetry);
      return;
    }

    operation.execute(server, callback);
  });
}

module.exports = executeOperation;
