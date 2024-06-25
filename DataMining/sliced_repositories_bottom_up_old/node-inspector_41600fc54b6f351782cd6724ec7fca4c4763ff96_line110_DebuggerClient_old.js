var EventEmitter = require('events').EventEmitter,
  inherits = require('util').inherits,
function createFailingConnection(reason) {
}
function DebuggerClient(debuggerPort) {
}
Object.defineProperties(DebuggerClient.prototype, {
  isRunning: {
    get: function() {
      return this._conn.isRunning;
    }
  },
  isReady: {
    get: function() {
    }
  }
});
DebuggerClient.prototype.connect = function() {
    .on('close', this._onConnectionClose.bind(this))
};
DebuggerClient.prototype._onConnectionOpen = function() {
  var describeProgram = '(' + function() {
  } + ')()';
};
DebuggerClient.prototype._onConnectionClose = function(reason) {
};
DebuggerClient.prototype.request = function(command, args, callback) {
  if (typeof callback !== 'function') {
    callback = function(error) {
    };
  }
  if (args && args.maxStringLength == null)
};
