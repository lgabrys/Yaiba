    Protocol = require('_debugger').Protocol,
    inherits = require('util').inherits,
    EventEmitter = require('events').EventEmitter,
    debugProtocol = require('debug')('node-inspector:protocol:v8-debug'),
function Debugger(port){
}
Object.defineProperties(Debugger.prototype, {
  isRunning: { writable: true, value: true },
});
Debugger.prototype._setupConnection = function() {
      protocol = new Protocol();
  protocol.onResponse = this._processResponse.bind(this);

};
Debugger.prototype._onConnectionOpen = function() {
};

Debugger.prototype._onConnectionError = function(err) {
  if (err.code == 'ECONNREFUSED') {
    err.helpString = 'Is node running with --debug port ' + this._port + '?';
  } else if (err.code == 'ECONNRESET') {
    err.helpString = 'Check there is no other debugger client attached to port ' + this._port + '.';
  }
  if (err.helpString) {
    this._lastError += '. ' + err.helpString;
  }
};
Debugger.prototype._onConnectionClose = function(hadError) {
};
Debugger.prototype._processResponse = function(message) {
  var obj = message.body;
  else if (obj.type === 'event') {
    this.emit(obj.event, obj);
  }
};
