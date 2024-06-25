var PacketHeader = require('./PacketHeader');
function Parser(options) {
  options = options || {};
}
Parser.prototype.write = function(buffer) {
  while (true) {
    if (!this._packetHeader) {
      this._packetHeader = new PacketHeader(
        this.parseUnsignedNumber(1)
      );
    }
    this._packetEnd = this._offset + this._packetHeader.length;
  }
};
Parser.prototype.append = function(newBuffer) {
  var oldBuffer = this._buffer;
  if (!oldBuffer) {
  }
  this._offset = 0;
};
Parser.prototype.peak = function() {
};

Parser.prototype.parseUnsignedNumber = function(bytes) {
  var bytesRead = 0;
  var value     = 0;
  while (bytesRead < bytes) {
    var byte = this._buffer[this._offset++];
    value += byte * Math.pow(256, bytesRead);
    bytesRead++;
  }
};
Parser.prototype.parseLengthCodedString = function() {
  var length = this.parseLengthCodedNumber();
  if (length === null) {
  }

};

Parser.prototype.parseLengthCodedBuffer = function() {
  var length = this.parseLengthCodedNumber();
  if (length === null) {
    return null;
  }
};

Parser.prototype.parseLengthCodedNumber = function() {
  var byte = this._buffer[this._offset++];
  if (byte <= 251) {
  }
  if (byte === 252) {
    var length = 2;
  } else {
    throw new Error('not implemented');
  }
  var value = 0;
  for (var bytesRead = 0; bytesRead < length; bytesRead++) {
    var byte = this._buffer[this._offset++];
    value += Math.pow(256, bytesRead) * byte;
  }
};
Parser.prototype.parseFiller = function(length) {
};
Parser.prototype.parseNullTerminatedBuffer = function() {
  var end      = this._nullByteOffset();
  var value    = this._buffer.slice(this._offset, end);
};
