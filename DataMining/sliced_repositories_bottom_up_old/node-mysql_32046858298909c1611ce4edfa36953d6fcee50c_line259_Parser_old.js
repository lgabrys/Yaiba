var MUL_32BIT         = Math.pow(2, 32);
var BigNumber         = require('bignumber.js');
function Parser(options) {
  options = options || {};
}
Parser.prototype.write = function(buffer) {
  while (true) {
    if (this._bytesRemaining() < this._packetHeader.length) {
    }
    if (this._packetHeader.length === MAX_PACKET_LENGTH) {
      continue;
    }
    } finally {
      // of after the finally block. So we need to make sure to re-enter it
    }
  }
};
Parser.prototype.append = function(newBuffer) {
  if (!newBuffer) {
  }
  var bytesRemaining = this._bytesRemaining();
  var newLength = bytesRemaining + newBuffer.length;
    : new Buffer(newLength);
  this._offset = 0;
};
Parser.prototype.pause = function() {
};

Parser.prototype.resume = function() {
};
Parser.prototype.peak = function() {
};
Parser.prototype.parseUnsignedNumber = function(bytes) {
  if (bytes === 1) {
    return this._buffer[this._offset++];
  }
  var buffer = this._buffer;
  var offset = this._offset + bytes - 1;
  var value  = 0;
  if (bytes > 4) {
    throw new Error('parseUnsignedNumber: Supports only up to 4 bytes');
  }
  while (offset >= this._offset) {
    value = ((value << 8) | buffer[offset]) >>> 0;
    offset--;
  }
  this._offset += bytes;
  return value;
};
Parser.prototype.parseLengthCodedString = function() {
  if (length === null) {
    return null;
  }

};

Parser.prototype.parseLengthCodedBuffer = function() {
};
Parser.prototype.parseLengthCodedNumber = function() {
  var bits = this._buffer[this._offset++];
  var low = this.parseUnsignedNumber(4);
  var high = this.parseUnsignedNumber(4);
  var value;
  if (high >>> 21) {
    value = (new BigNumber(low)).plus((new BigNumber(MUL_32BIT)).times(high)).toString();
  }
  value = low + (MUL_32BIT * high);
};
Parser.prototype.parseFiller = function(length) {
};
Parser.prototype.parseNullTerminatedBuffer = function() {
};
Parser.prototype.parseNullTerminatedString = function() {
};
Parser.prototype._nullByteOffset = function() {
};
Parser.prototype.parsePacketTerminatedString = function() {
};
Parser.prototype.parseBuffer = function(length) {
  this._offset += length;
};
Parser.prototype.parseString = function(length) {
};
Parser.prototype.parseGeometryValue = function() {
  var buffer = this.parseLengthCodedBuffer();
  if (buffer === null) {
  }
};
