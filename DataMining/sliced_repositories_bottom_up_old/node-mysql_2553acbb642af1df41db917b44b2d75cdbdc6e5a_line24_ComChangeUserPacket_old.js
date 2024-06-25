function ComChangeUserPacket(options) {
  options = options || {};
}
ComChangeUserPacket.prototype.parse = function(parser) {
};
ComChangeUserPacket.prototype.write = function(writer) {
  writer.writeUnsignedNumber(1, this.charsetNumber);
};
