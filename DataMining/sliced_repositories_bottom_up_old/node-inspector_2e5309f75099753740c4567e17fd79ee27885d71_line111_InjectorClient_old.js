var EventEmitter = require('events').EventEmitter,
    inherits = require('util').inherits,
function InjectorClient(config, session) {
}
Object.defineProperties(InjectorClient.prototype, {
  needsInject: {
  }
});


InjectorClient.prototype.tryHandleDebuggerBreak = function(sourceLine, done) {
};
InjectorClient.prototype.inject = function(cb) {
    cb = function(error, result) {};

  if (this.needsInject) {
  }
  if (this.needsInject && this._debuggerClient.isRunning) {
  }
};
InjectorClient.prototype._pause = function(cb) {
  this._debuggerClient.request('suspend', {}, function() {
  });
};
InjectorClient.prototype._resume = function(cb) {
};
InjectorClient.prototype._getFuncWithNMInScope = function(cb) {
};
InjectorClient.prototype._findNMInScope = function(funcHandle, cb) {
    this._debuggerClient.request('scope', {
    }, function(error, result, refs) {
      var NM = refs[result.object.ref].properties.filter(function(prop) {
      });
        error = new Error('No NativeModule in target scope');
      cb(error, NM[0].ref);
    }.bind(this));
};
