var Packets      = require('../packets');
var ResultSet    = require('../ResultSet');
function Query(options, callback) {
}
Query.prototype.start = function() {
};
Query.prototype.determinePacket = function(firstByte, header) {
};
Query.prototype['OkPacket'] = function(packet) {
  this._index++;
};
Query.prototype['ErrorPacket'] = function(packet) {
  var err = this._packetToError(packet);
};
