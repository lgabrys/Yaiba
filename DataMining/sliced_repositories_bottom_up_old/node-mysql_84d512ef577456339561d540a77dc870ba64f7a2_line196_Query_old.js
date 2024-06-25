var Readable     = require('stream').Readable || require('readable-stream');
function Query(options, callback) {
}
Query.prototype.start = function() {
};
Query.prototype.determinePacket = function(firstByte, parser) {
};
Query.prototype['OkPacket'] = function(packet) {
};
Query.prototype['ErrorPacket'] = function(packet) {
};
Query.prototype['ResultSetHeaderPacket'] = function(packet) {
};
Query.prototype['FieldPacket'] = function(packet) {
};
Query.prototype['EofPacket'] = function(packet) {
};
Query.prototype._handleFinalResultPacket = function(packet) {
};
Query.prototype['RowDataPacket'] = function(packet, parser, connection) {
};
Query.prototype._sendLocalDataFile = function(path) {
};
Query.prototype.stream = function(options) {
  var self = this,
      stream;
  options = options || {};
  options.objectMode = true;
  stream = new Readable(options);
  stream._read = function() {
    self._connection.resume();
  };
};
