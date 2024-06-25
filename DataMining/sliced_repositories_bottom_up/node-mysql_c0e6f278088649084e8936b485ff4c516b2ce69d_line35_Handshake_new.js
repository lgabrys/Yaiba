var Packets  = require('../packets');
function Handshake(config, callback) {
}
Handshake.prototype.determinePacket = function() {
};
Handshake.prototype['HandshakeInitializationPacket'] = function(packet) {
  this._handshakeInitializationPacket = packet;
};
Handshake.prototype['ErrorPacket'] = function(packet) {
  var err = this._packetToError(packet, true);
};
