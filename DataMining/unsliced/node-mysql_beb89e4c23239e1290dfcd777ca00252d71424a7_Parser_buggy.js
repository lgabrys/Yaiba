var PacketHeader = require('./PacketHeader');

module.exports = Parser;
function Parser(options) {
  options = options || {};

  this._buffer       = null;
  this._offset       = 0;
  this._packetEnd    = null;
  this._packetHeader = null;
  this._packetParser = options.packetParser || function() {};
  this._encoding     = 'utf-8';
}

Parser.prototype.write = function(buffer) {
  this.append(buffer);

  while (true) {
    if (!this._packetHeader) {
      if (this._bytesRemaining() < 4) {
        break;
      }

      this._packetHeader = new PacketHeader(
        this.parseUnsignedNumber(3),
        this.parseUnsignedNumber(1)
      );
    }

    if (this._bytesRemaining() < this._packetHeader.length) {
      break;
    }

    this._packetEnd = this._offset + this._packetHeader.length;

    this._packetParser(this._packetHeader);

    this._offset       = this._packetEnd;
    this._packetHeader = null;
    this._packetEnd    = null;
  }
};

Parser.prototype.append = function(newBuffer) {
  var oldBuffer = this._buffer;
  if (!oldBuffer) {
    this._buffer = newBuffer;
    return;
  }

  var bytesRemaining = this._bytesRemaining();
  var newLength = bytesRemaining + newBuffer.length;

  var combinedBuffer = (newLength < this._offset)
    ? oldBuffer.slice(0, newLength)
    : new Buffer(newLength);

  oldBuffer.copy(combinedBuffer, 0, this._offset);
  newBuffer.copy(combinedBuffer, bytesRemaining);

  this._buffer = combinedBuffer;
  this._offset = 0;
};

Parser.prototype.peak = function() {
  return this._buffer[this._offset];
};

Parser.prototype.parseUnsignedNumber = function(bytes) {
  var bytesRead = 0;
  var value     = 0;

  while (bytesRead < bytes) {
    var byte = this._buffer[this._offset++];

    value += byte * Math.pow(256, bytesRead);

    bytesRead++;
  }

  return value;
};

Parser.prototype.parseLengthCodedString = function() {
  var length = this.parseLengthCodedNumber();

  if (length === null) {
    return null;
  }

  return this.parseString(length);
};

Parser.prototype.parseLengthCodedBuffer = function() {
  var length = this.parseLengthCodedNumber();

  if (length === null) {
    return null;
  }

  return this.parseBuffer(length);
};

Parser.prototype.parseLengthCodedNumber = function() {
  var byte = this._buffer[this._offset++];

  if (byte <= 251) {
    return (byte === 251)
      ? null
      : byte;
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

  return value;
};

Parser.prototype.parseFiller = function(length) {
  return this.parseBuffer(length);
};

Parser.prototype.parseNullTerminatedBuffer = function() {
  var end      = this._nullByteOffset();
  var value    = this._buffer.slice(this._offset, end - 1);
  this._offset = end + 1;

  return value;
};

Parser.prototype.parseNullTerminatedString = function() {
  var end      = this._nullByteOffset();
  var value    = this._buffer.toString(this._encoding, this._offset, end)
  this._offset = end + 1;

  return value;
};

Parser.prototype._nullByteOffset = function() {
  var offset = this._offset;

  while (this._buffer[offset] !== 0x00) {
    offset++;

    if (offset >= this._buffer.length) {
      throw new Error('Offset of null terminated string not found.');
    }
  }

  return offset;
};

Parser.prototype.parsePacketTerminatedString = function() {
  var length = this._packetEnd - this._offset;
  return this.parseString(length);
};

Parser.prototype.parseBuffer = function(length) {
  var buffer = this._buffer.slice(this._offset, this._offset + length);

  this._offset += length;
  return buffer;
};

Parser.prototype.parseString = function(length) {
  var offset = this._offset;
  var end = offset + length;
  var value = this._buffer.toString(this._encoding, offset, end);

  this._offset = end;
  return value;
};

Parser.prototype.reachedPacketEnd = function() {
  return this._offset === this._packetEnd;
};

Parser.prototype._bytesRemaining = function() {
  return this._buffer.length - this._offset;
};
