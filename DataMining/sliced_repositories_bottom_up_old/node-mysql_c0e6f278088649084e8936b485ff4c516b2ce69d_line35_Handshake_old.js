var Sequence = require('./Sequence');
var Packets  = require('../packets');
function Handshake(config, callback) {
  Sequence.call(this, callback);
}
Handshake.prototype.determinePacket = function() {
  if (!this._handshakeInitializationPacket) {
    return Packets.HandshakeInitializationPacket;
  }
};
Handshake.prototype['HandshakeInitializationPacket'] = function(packet) {
  this._handshakeInitializationPacket = packet;
};
Handshake.prototype['ErrorPacket'] = function(packet) {
  var err = Sequence.packetToError(packet, true);
};
