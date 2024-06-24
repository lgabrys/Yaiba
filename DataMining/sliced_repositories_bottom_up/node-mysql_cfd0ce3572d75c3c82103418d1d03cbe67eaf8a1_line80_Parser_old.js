function Parser(options) {
  options = options || {};
}
Parser.prototype.write = function(buffer) {
  while (true) {
    if (!this._packetHeader) {
      if (this._packetHeader.number !== this._nextPacketNumber) {
        var err = new Error(
        );
        err.code  = 'PROTOCOL_PACKETS_OUT_OF_ORDER';
        err.fatal = true;
      }
    }
    } catch (err) {
      if (typeof err.code !== 'string' || err.code.substr(0, 7) !== 'PARSER_') {
      }
    } finally {
  }
};
