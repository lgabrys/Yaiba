var Sequence     = require('./Sequence');
var Packets      = require('../packets');
var ResultSet    = require('../ResultSet');
function Query(options, callback) {
  Sequence.call(this, callback);
}
Query.prototype.start = function() {
  this._emitPacket(new Packets.ComQueryPacket(this.sql));
};
Query.prototype.determinePacket = function(firstByte, header) {
  if (firstByte === 0 || firstByte === 255) {
    return;
  }
};
Query.prototype['OkPacket'] = function(packet) {
  if (!this._callback) {
    this.emit('result', packet, this._index);
  } else {
  this._index++;
};
Query.prototype['ErrorPacket'] = function(packet) {
  var err = Sequence.packetToError(packet);
};
