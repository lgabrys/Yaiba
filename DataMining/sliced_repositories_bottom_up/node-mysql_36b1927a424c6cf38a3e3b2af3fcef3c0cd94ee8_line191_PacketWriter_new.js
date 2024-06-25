var BUFFER_ALLOC_SIZE = Math.pow(2, 8);
function PacketWriter() {
}
PacketWriter.prototype.toBuffer = function toBuffer(parser) {
};
PacketWriter.prototype.writeUnsignedNumber = function(bytes, value) {
  for (var i = 0; i < bytes; i++) {
    this._buffer[this._offset++] = (value >> (i * 8)) & 0xff;
  }
};
PacketWriter.prototype.writeFiller = function(bytes) {
  for (var i = 0; i < bytes; i++) {
    this._buffer[this._offset++] = 0x00;
  }
};
PacketWriter.prototype.writeNullTerminatedString = function(value, encoding) {
  value = value || '';
  value = value + '';
  var bytes = Buffer.byteLength(value, encoding || 'utf-8') + 1;
  this._offset += bytes;
};
PacketWriter.prototype.writeString = function(value) {
  value = value || '';
  value = value + '';
  var bytes = Buffer.byteLength(value, 'utf-8');
  this._offset += bytes;
};
PacketWriter.prototype.writeBuffer = function(value) {
  var bytes = value.length;
  this._offset += bytes;
};
PacketWriter.prototype.writeLengthCodedNumber = function(value) {
  if (value === null) {
    this._buffer[this._offset++] = 251;
  }
  if (value <= 250) {
    this._buffer[this._offset++] = value;
  }
  if (value <= BIT_16) {
    this._buffer[this._offset++] = 252;
  } else if (value <= BIT_24) {
    this._buffer[this._offset++] = 253;
  } else {
    this._buffer[this._offset++] = 254;
  }
  this._buffer[this._offset++] = value & 0xff;
  this._buffer[this._offset++] = (value >> 8) & 0xff;
  this._buffer[this._offset++] = (value >> 16) & 0xff;
  this._buffer[this._offset++] = (value >> 24) & 0xff;
  value = value.toString(2);
  value = value.substr(0, value.length - 32);
  value = parseInt(value, 2);

  this._buffer[this._offset++] = value & 0xff;
  this._buffer[this._offset++] = (value >> 8) & 0xff;
  this._buffer[this._offset++] = (value >> 16) & 0xff;
  this._buffer[this._offset++] = 0;
};
PacketWriter.prototype.writeLengthCodedBuffer = function(value) {
  var bytes = value.length;
};
PacketWriter.prototype.writeNullTerminatedBuffer = function(value) {
};

PacketWriter.prototype.writeLengthCodedString = function(value) {
  value = (value === undefined)
  var bytes = Buffer.byteLength(value, 'utf-8');
  this._offset += bytes;
};
PacketWriter.prototype._allocate = function _allocate(bytes) {
  if (!this._buffer) {
    this._buffer = new Buffer(Math.max(BUFFER_ALLOC_SIZE, bytes));
  }
};
