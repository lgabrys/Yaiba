var EventEmitter = require('events').EventEmitter;
var spawn = require('child_process').spawn;
var readlink = require('graceful-readlink').readlinkSync;
var path = require('path');
var dirname = path.dirname;
var basename = path.basename;
var fs = require('fs');

function Option(flags, description) {
  this.flags = flags;
  this.required = ~flags.indexOf('<');
  flags = flags.split(/[ ,|]+/);


Option.prototype.name = function() {
  return this.long
    .replace('--', '')
    .replace('no-', '');
};
Option.prototype.is = function(arg) {
  return arg == this.short || arg == this.long;
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
Command.prototype.addImplicitHelpCommand = function() {
  this.command('help [cmd]', 'display help for [cmd]');
};
Command.prototype.parseExpectedArgs = function(args) {
  if (!args.length) return;
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
      } else if (option.flags.indexOf('<boolean>') > -1 || option.flags.indexOf('[boolean]') > -1) {
        self[name] = (val === 'true');
      } else {
        self[name] = val;
      }
    } else if (null !== val) {
      self[name] = val;
    }
  });
};
Command.prototype.allowUnknownOption = function(arg) {
    this._allowUnknownOption = arguments.length === 0 || arg;
};
Command.prototype.parse = function(argv) {
  // implicit help
  if (this.executables) this.addImplicitHelpCommand();
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
  var f = argv[1];
  var link = readlink(f);
  if (link !== f) {
    link = path.join(dirname(f), link)
  }
  var dir = dirname(link);
  var bin = basename(f, '.js') + '-' + args[0];
  var local = path.join(dir, bin);
  try {
    if (fs.statSync(local).isFile()) {
      bin = local;
    }
  } catch (e) {}
  args = args.slice(1);
  var proc;
  if (process.platform !== 'win32') {
    proc = spawn(bin, args, { stdio: 'inherit'});
  } else {
};
