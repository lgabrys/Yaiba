var Types                        = require('../constants/types');
var IEEE_754_BINARY_64_PRECISION = Math.pow(2, 53);
function typeCast(field, parser, timeZone, supportBigNumbers, bigNumberStrings, dateStrings) {
  var numberString;
  switch (field.type) {
    case Types.TINY:
    case Types.SHORT:
    case Types.LONG:
    case Types.INT24:
    case Types.YEAR:
    case Types.FLOAT:
    case Types.DOUBLE:
      numberString = parser.parseLengthCodedString();
    case Types.NEWDECIMAL:
    case Types.LONGLONG:
      numberString = parser.parseLengthCodedString();
      return (numberString === null || (field.zeroFill && numberString[0] == "0"))
        ? numberString
        : ((supportBigNumbers && (bigNumberStrings || (Number(numberString) >= IEEE_754_BINARY_64_PRECISION) || Number(numberString) <= -IEEE_754_BINARY_64_PRECISION))
          ? numberString
          : Number(numberString));
  }
}
