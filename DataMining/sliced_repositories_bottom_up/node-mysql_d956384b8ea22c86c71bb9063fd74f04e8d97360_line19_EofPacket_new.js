function EofPacket(options) {
  options = options || {};
}
EofPacket.prototype.parse = function(parser) {
};
EofPacket.prototype.write = function(writer) {
  writer.writeUnsignedNumber(2, this.statusFlags);
};
