var EventEmitter = require('events').EventEmitter;
function Option(flags, description) {
  flags = flags.split(/[ ,|]+/);
Option.prototype.name = function(){
};
Option.prototype.is = function(arg){
};
function Command(name) {
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
    self._args.forEach(function(arg, i){
        self.missingArgument(arg.name);
    });
    if (self._args.length) {
      args[self._args.length] = self;
    }
    fn.apply(this, args);
  };
};
