var Types                        = require('../constants/types');
function RowDataPacket() {
}
RowDataPacket.prototype.parse = function(parser, fieldPackets, typeCast, nestTables, connection) {
  var self = this;
  var next = function () {
  };
};
RowDataPacket.prototype._typeCast = function(field, parser, timeZone, supportBigNumbers, bigNumberStrings) {
  var numberString;
  switch (field.type) {
      var dateString = parser.parseLengthCodedString();
      if (timeZone != 'local') {
        if (field.type === Types.DATE) {
          dateString += ' 00:00:00 ' + timeZone;
        } else {
          dateString += ' ' + timeZone;
        }
      }
  }
};
