    inherits = require('util').inherits,
    EventEmitter = require('events').EventEmitter,
    debugProtocol = require('debug')('node-inspector:protocol:v8-debug'),
function Debugger(port){
}
Object.defineProperties(Debugger.prototype, {
  isRunning: { writable: true, value: true },
});
Debugger.prototype._setupConnection = function() {

    .setEncoding('utf8');
};
Debugger.prototype._onConnectionOpen = function() {
  this._connected = true;
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
  if (typeof obj.running === 'boolean') {
  }
  else if (obj.type === 'event') {
    if (['break', 'exception'].indexOf(obj.event) > -1) {
      this.isRunning = false;
    }
  }
  else {
  }
};
Debugger.prototype.send = function(data) {
  if (this.connected) {
    this._connection.write('Content-Length: ' + data.length + '\r\n\r\n' + data);
  }
};
