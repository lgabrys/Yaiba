var EventEmitter = require('events').EventEmitter,
  inherits = require('util').inherits,
function createFailingConnection(reason) {
}
function DebuggerClient(debuggerPort) {
}
Object.defineProperties(DebuggerClient.prototype, {
  isRunning: {
  },
});
DebuggerClient.prototype.connect = function() {

};

DebuggerClient.prototype.registerDebuggerEventHandlers = function(eventNames) {
  for (var i in arguments) {
  }
};
DebuggerClient.prototype._onConnectionOpen = function() {
  this.evaluateGlobal('process.version', function(error, result) {
  }.bind(this));
};
DebuggerClient.prototype._onConnectionClose = function(reason) {
};
DebuggerClient.prototype._emitDebuggerEvent = function(name, message) {
};
DebuggerClient.prototype.request = function(command, args, callback) {
  if (typeof callback !== 'function') {
    callback = function(error) {
    };
  }
    args.maxStringLength = 10000;
};
