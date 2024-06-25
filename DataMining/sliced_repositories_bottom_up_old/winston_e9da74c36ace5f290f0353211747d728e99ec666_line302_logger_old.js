var events = require('events'),
    util = require('util'),
    config = require('./config'),
//
//
// ### function Logger (options)
// #### @options {Object} Options for this instance.
var Logger = exports.Logger = function (options) {
  options = options || {};
  this.transports        = {};
  if (options.transports) {
    options.transports.forEach(function (transport) {
      if (transport.handleExceptions) {
      }
    });
  }
};
Logger.prototype.extend = function (target) {
  var self = this;
  ['log', 'profile', 'startTimer'].concat(Object.keys(this.levels)).forEach(function (method) {
    target[method] = function () {
    };
  });
};
Logger.prototype.log = function (level, msg) {
  var self = this,
      callback,
      meta;
  if (arguments.length === 3) {
    if (typeof arguments[2] === 'function') {
      meta = {};
      callback = arguments[2];
    }
    else if (typeof arguments[2] === 'object') {
      meta = arguments[2];
    }
  }
  else if (arguments.length === 4) {
    meta = arguments[2];
    callback = arguments[3];
  }
  if (this.padLevels) {
    msg = new Array(this.levelLength - level.length).join(' ') + msg;
  }
  this.rewriters.forEach(function(rewriter) {
    meta = rewriter(level, msg, meta);
  });
  //
  if (this.stripColors) {
    var code = /\u001b\[\d+m/g;
    msg = ('' + msg).replace(code, '');
  }
  // Immediately respond to the callback
};

Logger.prototype.close = function () {
  var self = this;
  this._names.forEach(function (name) {
  });
};
// ### function handleExceptions ()
Logger.prototype.handleExceptions = function () {
  var args = Array.prototype.slice.call(arguments),
      handlers = [],
      self = this;
  args.forEach(function (a) {
    if (Array.isArray(a)) {
      handlers = handlers.concat(a);
    }
  });
  handlers.forEach(function (handler) {
    self.exceptionHandlers[handler.name] = handler;
  });
};
Logger.prototype.unhandleExceptions = function () {
  var self = this;
};
Logger.prototype.add = function (transport, options, created) {
  var instance = created ? transport : (new (transport)(options));
  instance._onError = this._onError.bind(this, instance)
  if (transport.handleExceptions && !this.catchExceptions) {
  }
};
