var EventEmitter = require('events').EventEmitter;
var path = require('path');
var basename = path.basename;
function Option(flags, description) {
  flags = flags.split(/[ ,|]+/);
Option.prototype.name = function(){
};
Option.prototype.is = function(arg){
};
function Command(name) {
  this.commands = [];
  this.options = [];
  this._execs = [];
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
};
Command.prototype.parseExpectedArgs = function(args){
  var self = this;
  args.forEach(function(arg){
  });
};
Command.prototype.action = function(fn){
  var self = this;
  var listener = function(args, unknown){
    args = args || [];
    unknown = unknown || [];
    var parsed = self.parseOptions(unknown);
    if (parsed.args.length) args = parsed.args.concat(args);
    if (self._args.length) {
      args[self._args.length] = self;
    } else {
  };
};
Command.prototype.option = function(flags, description, fn, defaultValue){
  var self = this
    , option = new Option(flags, description)
    , oname = option.name()
    , name = camelcase(oname);
  if (typeof fn != 'function') {
    defaultValue = fn;
    fn = null;
  }
  if (false == option.bool || option.optional || option.required) {
    if (false == option.bool) defaultValue = true;
    if (undefined !== defaultValue) self[name] = defaultValue;
  }
  this.on(oname, function(val){
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
Command.prototype.parse = function(argv){
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
  args = args.slice(1);
};
Command.prototype.normalize = function(args){
  var ret = []
    , arg
    , lastOpt
    , index;
  for (var i = 0, len = args.length; i < len; ++i) {
    arg = args[i];
    if (i > 0) {
      lastOpt = this.optionFor(args[i-1]);
    }
    if (arg === '--') {
    	ret = ret.concat(args.slice(i));
    } else if (lastOpt && lastOpt.required) {
    } else if (arg.length > 1 && '-' == arg[0] && '-' != arg[1]) {
    } else if (/^--/.test(arg) && ~(index = arg.indexOf('='))) {
    } else {
  }
};
Command.prototype.parseArgs = function(args, unknown){
  var cmds = this.commands
    , len = cmds.length
    , name;
  if (args.length) {
    name = args[0];
  } else {
};
Command.prototype.optionFor = function(arg){
  for (var i = 0, len = this.options.length; i < len; ++i) {
  }
};
Command.prototype.parseOptions = function(argv){
  var args = []
    , len = argv.length
    , literal
    , option
    , arg;
  var unknownOptions = [];
  for (var i = 0; i < len; ++i) {
    arg = argv[i];
    if ('--' == arg) {
      literal = true;
    }
    option = this.optionFor(arg);
    if (option) {
      if (option.required) {
        arg = argv[++i];
      } else if (option.optional) {
        arg = argv[i+1];
        if (null == arg || ('-' == arg[0] && '-' != arg)) {
          arg = null;
        } else {
          ++i;
        }
      } else {
    }
    if (arg.length > 1 && '-' == arg[0]) {
      if (argv[i+1] && '-' != argv[i+1][0]) {
        unknownOptions.push(argv[++i]);
      }
    }
  }
};
Command.prototype.missingArgument = function(name){
};
Command.prototype.optionMissingArgument = function(option, flag){
};
Command.prototype.unknownOption = function(flag){
};
Command.prototype.version = function(str, flags){
  flags = flags || '-V, --version';
  this.on('version', function(){
    process.stdout.write(str + '\n');
  });
};
