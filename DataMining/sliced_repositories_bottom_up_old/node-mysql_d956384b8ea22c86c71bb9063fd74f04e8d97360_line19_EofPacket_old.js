function EofPacket(options) {
  options = options || {};
}
EofPacket.prototype.parse = function(parser) {
};
EofPacket.prototype.write = function(writer) {
  writer.writeUnsignedNumber(1, this.statusFlags);
};
