var events = require('events'),
    util = require('util'),
    config = require('./config'),
    common = require('./common'),
    exception = require('./exception'),
// Time constants

// ### function Logger (options)
// #### @options {Object} Options for this instance.
var Logger = exports.Logger = function (options) {
  options = options || {};
  if (options.transports) {
  }
  if (options.rewriters) {
    options.rewriters.forEach(function (rewriter) {
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
// #### @callback {function} Continuation to respond to when complete.
Logger.prototype.log = function (level) {
  var self = this,
      args = Array.prototype.slice.call(arguments, 1),
      callback = typeof args[args.length - 1] === 'function' ? args.pop() : null,
      meta     = typeof args[args.length - 1] === 'object' ? args.pop() : {},
      msg      = util.format.apply(null, args);
  if (this.padLevels) {
    msg = new Array(this.levelLength - level.length + 1).join(' ') + msg;
  }
  this.rewriters.forEach(function (rewriter) {
    meta = rewriter(level, msg, meta);
  });
  if (this.stripColors) {
    var code = /\u001b\[(\d+(;\d+)*)?m/g;
    msg = ('' + msg).replace(code, '');
  }
  function cb(err) {
    callback = null;
  }
};
// Queries the all transports for this instance with the specified `options`.
Logger.prototype.query = function (options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  var self = this,
      query = common.clone(options.query) || {},
  //
  function queryTransport(transport, next) {
    if (options.query) {
      options.query = transport.formatQuery(query);
    }
    transport.query(options, function (err, results) {
      if (err) {
        return next(err);
      }
    });
  }
  function addResults (transport, next) {
  }
  if (options.transport) {
    options.transport = options.transport.toLowerCase();
  }
};
Logger.prototype.stream = function (options) {
  var self = this,
      options = options || {},
};
Logger.prototype.close = function () {
  var self = this;
  this._names.forEach(function (name) {
  });
};
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
};
Logger.prototype.addRewriter = function (rewriter) {
}
Logger.prototype.clear = function () {
  for (var name in this.transports) {
  }
};
Logger.prototype.remove = function (transport) {
  var name = transport.name || transport.prototype.name;
};
var ProfileHandler = function (logger) {
  this.logger = logger;
  this.start = Date.now();
  this.done = function (msg) {
  }
}
Logger.prototype.startTimer = function () {
}
Logger.prototype.profile = function (id) {
  var now = Date.now(), then, args,
      msg, meta, callback;
  if (this.profilers[id]) {
    then = this.profilers[id];
    args     = Array.prototype.slice.call(arguments);
    callback = typeof args[args.length - 1] === 'function' ? args.pop() : null;
    meta     = typeof args[args.length - 1] === 'object' ? args.pop() : {};
    msg      = args.length === 2 ? args[1] : id;
    meta.duration = now - then + 'ms';
  }
};
Logger.prototype.setLevels = function (target) {
};
Logger.prototype.cli = function () {
};
Logger.prototype._uncaughtException = function (err) {
  var self = this,
      responded = false,
      info = exception.getAllInfo(err),
      handlers = this._getExceptionHandlers(),
      timeout,
      doExit;
  doExit = typeof this.exitOnError === 'function'
  function logAndWait(transport, next) {
    transport.logException('uncaughtException', info, next, err);
  }
};
