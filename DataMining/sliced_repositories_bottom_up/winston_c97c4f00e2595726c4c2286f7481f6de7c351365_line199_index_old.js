var assume = require('assume'),
    fs = require('fs'),
    path = require('path'),
    through = require('through2'),
    spawn = require('child_process').spawn,
    stream = require('stream'),
    util = require('util'),
    winston = require('../../lib/winston');
var helpers = exports;

/**
 * Returns a new winston.Logger instance which will invoke
 * the `write` method on each call to `.log`
 *
 * @param {function} write Write function for the specified stream
 * @returns {Logger} A winston.Logger instance
 */



helpers.createLogger = function (write) {
  var writeable = new stream.Writable({
    objectMode: true,
    write: write
  });
};

helpers.writeable = function (write) {
  return new stream.Writable({
    objectMode: true,
    write: write
  });
};
helpers.exceptionHandler = function (opts) {
  var logger = new winston.Logger(opts);
};

helpers.clearExceptions = function () {
  var listeners = process.listeners('uncaughtException');
  return {
    restore: function () {
    }
  };
};

helpers.throw = function (msg) {
  throw new Error(msg);
};
helpers.tryUnlink = function (file) {
  try { fs.unlinkSync(file) }
  catch (ex) { }
};
helpers.tryRead = function tryRead(filename) {
  var proxy = through();
  (function inner() {
  })();
}
helpers.assumeFormatted = function (format, info, assertion) {
  return function (done) {
    var writeable = helpers.writeable(function (info) {
      assertion(info);
    });
  };
}
helpers.assertDateInfo = function (info) {
  assume(Date.parse(info)).is.a('number');
};
helpers.assertProcessInfo = function (info) {
  assume(info.pid).is.a('number');
};
helpers.assertOsInfo = function (info) {
  assume(info.loadavg).is.an('array');
};
helpers.assertTrace = function (trace) {
  trace.forEach(function (site) {
    assume(!site.column || typeof site.column === 'number').true();
  });
};
helpers.assertLogger = function (logger, level) {
  assume(logger).instanceOf(winston.Logger);
  Object.keys(logger.levels).forEach(function (method) {
  });
};
helpers.assertConsole = function (transport) {
  assert.instanceOf(transport, winston.transports.Console);
};
helpers.assertHandleExceptions = function (options) {
  return function (done) {
    var child = spawn('node', [options.script]);
    child.on('exit', function () {
      fs.readFile(options.logfile, function (err, data) {
        data = JSON.parse(data);
        if (options.message) {
          assume(data.message).equal('uncaughtException: ' + options.message);
        }
      });
    });
  };
};
