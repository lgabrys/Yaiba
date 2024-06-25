    config = require('./config'),
// Time constants

//
// ### function Logger (options)
// #### @options {Object} Options for this instance.
var Logger = exports.Logger = function (options) {
  options = options || {};
      handleExceptions = false;
  //
  if (options.transports) {
    options.transports.forEach(function (transport) {
      if (transport.handleExceptions) {
        handleExceptions = true;
      }
    });
  }
  if (options.exceptionHandlers) {
    handleExceptions = true;
  }
};
Logger.prototype.extend = function (target) {
  var self = this;
  ['log', 'profile', 'startTimer'].concat(Object.keys(this.levels)).forEach(function (method) {
    target[method] = function () {
      return self[method].apply(self, arguments);
    };
  });
};
Logger.prototype.log = function (level, msg) {
  if (this.padLevels) {
    msg = new Array(this.levelLength - level.length).join(' ') + msg;
  }
  // For consideration of terminal 'color" programs like colors.js,
  if (this.stripColors) {
    var code = /\u001b\[\d+m/g;
    msg = ('' + msg).replace(code, '');
  }

  function emit(name, next) {
      || (!transport.level && self.levels[self.level] <= self.levels[level])) {
    } else {
    }
  }
  function cb(err) {
  }
};
// This will aggregate each transport's results into one object containing
Logger.prototype.query = function (options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
      transports;
  function queryTransport(transport, next) {
    if (options.query) {
      options.query = transport.formatQuery(query);
    }
  }
  if (options.transport) {
    options.transport = options.transport.toLowerCase();
  }
  transports = this._names.map(function (name) {
  }).filter(function (transport) {
    return !!transport.query;
  });
};
