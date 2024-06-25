var Sequences    = require('./sequences');
function Protocol(options) {
  options = options || {};
}
Protocol.prototype.write = function(buffer) {
};
Protocol.prototype.handshake = function(cb) {
};
Protocol.prototype.query = function(options, cb) {
};
Protocol.prototype.changeUser = function(options, cb) {
};
Protocol.prototype.ping = function(cb) {
};
Protocol.prototype.stats = function(cb) {
};
Protocol.prototype.quit = function(cb) {
};
Protocol.prototype.end = function() {
};
Protocol.prototype.pause = function() {
  var seq = this._queue[0];
};
Protocol.prototype.resume = function() {
  var seq = this._queue[0];
};
Protocol.prototype._enqueue = function(sequence) {
  if (this._config.trace) {
    sequence._callSite = sequence._callSite || new Error;
  }
};
