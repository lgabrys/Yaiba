var EventEmitter = require('events').EventEmitter;
var path = require('path');
var basename = path.basename;

function Option(flags, description) {
  this.required = ~flags.indexOf('<');
  flags = flags.split(/[ ,|]+/);


Option.prototype.name = function() {
};
Option.prototype.is = function(arg) {
};
function Command(name) {
  this.commands = [];
  this.options = [];
  this._execs = [];
  this._allowUnknownOption = false;
  this._args = [];
  this._name = name;
}
Command.prototype.__proto__ = EventEmitter.prototype;




Command.prototype.command = function(name, desc) {
  var args = name.split(/ +/);
  var cmd = new Command(args.shift());
  cmd.parent = this;
};
Command.prototype.arguments = function (desc) {
}
Command.prototype.addImplicitHelpCommand = function() {
};
Command.prototype.parseExpectedArgs = function(args) {
  var self = this;
  args.forEach(function(arg) {
  });
};
Command.prototype.action = function(fn) {
  var self = this;
  var listener = function(args, unknown) {
    args = args || [];
    unknown = unknown || [];
    var parsed = self.parseOptions(unknown);
    if (parsed.args.length) args = parsed.args.concat(args);
    self._args.forEach(function(arg, i) {
      } else if (arg.variadic) {
        args[i] = args.splice(i);
      }
    });
    if (self._args.length) {
      args[self._args.length] = self;
    } else {
  };
};
Command.prototype.option = function(flags, description, fn, defaultValue) {
  var self = this
    , option = new Option(flags, description)
    , oname = option.name()
    , name = camelcase(oname);
  if (typeof fn != 'function') {
    if (fn instanceof RegExp) {
      fn = function(val, def) {
      }
    }
    else {
      defaultValue = fn;
      fn = null;
    }
  }
  if (false == option.bool || option.optional || option.required) {
    if (false == option.bool) defaultValue = true;
    if (undefined !== defaultValue) self[name] = defaultValue;
  }
  this.on(oname, function(val) {
    if (null !== val && fn) val = fn(val, undefined === self[name]
      : self[name]);
    if ('boolean' == typeof self[name] || 'undefined' == typeof self[name]) {
      if (null == val) {
        self[name] = option.bool
      } else {
        self[name] = val;
      }
    } else if (null !== val) {
      self[name] = val;
    }
  });
};
Command.prototype.allowUnknownOption = function(arg) {
};
Command.prototype.parse = function(argv) {
  var parsed = this.parseOptions(this.normalize(argv.slice(2)));
  var args = this.args = parsed.args;
  var result = this.parseArgs(this.args, parsed.unknown);
  var name = result.args[0];
};
Command.prototype.executeSubCommand = function(argv, args, unknown) {
  args = args.concat(unknown);
  if ('help' == args[0]) {
    args[0] = args[1];
    args[1] = '--help';
  }
  var isExplicitJS = false;
  if (exists(localBin + '.js')) {
    isExplicitJS = true;
  } else if (exists(localBin)) {
  args = args.slice(1);
  if (process.platform !== 'win32') {
    if (isExplicitJS) {
      args = (process.execArgv || []).concat(args);
    } else {
  } else {
};
