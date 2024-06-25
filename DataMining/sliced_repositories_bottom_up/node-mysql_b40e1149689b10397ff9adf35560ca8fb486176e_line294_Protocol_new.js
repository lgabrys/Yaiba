var Sequences    = require('./sequences');
var Packets      = require('./packets');
var PacketWriter = require('./PacketWriter');
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
  var expected = (this._quitSequence && this._queue[0] === this._quitSequence);
};
Protocol.prototype.pause = function() {
};
Protocol.prototype.resume = function() {
};
Protocol.prototype._enqueue = function(sequence) {
};
Protocol.prototype._validateEnqueue = function(sequence) {
  var err;
  var prefix = 'Cannot enqueue ' + sequence.constructor.name + ' after ';
  if (this._quitSequence) {
    err      = new Error(prefix + 'invoking quit.');
    err.code = 'PROTOCOL_ENQUEUE_AFTER_QUIT';
  } else if (this._destroyed) {
    err      = new Error(prefix + 'being destroyed.');
    err.code = 'PROTOCOL_ENQUEUE_AFTER_DESTROY';
  } else if (this._handshakeSequence && sequence.constructor === Sequences.Handshake) {
    err      = new Error(prefix + 'already enqueuing a Handshake.');
    err.code = 'PROTOCOL_ENQUEUE_HANDSHAKE_TWICE';
  } else {
  err.fatal = false;
};
Protocol.prototype._parsePacket = function() {
  var sequence = this._queue[0];
  var Packet   = this._determinePacket(sequence);
  var packet   = new Packet();
};
Protocol.prototype._emitPacket = function(packet) {
  var packetWriter = new PacketWriter();
};
Protocol.prototype._determinePacket = function(sequence) {
  var firstByte = this._parser.peak();
};
Protocol.prototype._dequeue = function() {
};
Protocol.prototype.handleNetworkError = function(err) {
  err.fatal = true;
  var sequence = this._queue[0];
};
Protocol.prototype._delegateError = function(err, sequence) {
};
Protocol.prototype._shouldErrorBubbleUp = function(err, sequence) {
};
Protocol.prototype._hasPendingErrorHandlers = function() {
  return this._queue.some(function(sequence) {
  });
};
Protocol.prototype.destroy = function() {
};
Protocol.prototype._debugPacket = function(incoming, packet) {
  var headline = (incoming)
  headline = headline + packet.constructor.name;
  if (Array.isArray(this._config.debug) && this._config.debug.indexOf(packet.constructor.name) === -1) {
  }
};
