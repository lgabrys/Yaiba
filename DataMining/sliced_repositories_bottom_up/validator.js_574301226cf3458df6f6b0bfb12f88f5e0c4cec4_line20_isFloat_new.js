exports.default = isFloat;

var _assertString = require('./util/assertString');

var _assertString2 = _interopRequireDefault(_assertString);
var _alpha = require('./alpha');
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function isFloat(str, options) {
  (0, _assertString2.default)(str);
  options = options || {};
  var float = new RegExp('^(?:[-+])?(?:[0-9]+)?(?:\\' + (options.locale ? _alpha.decimal[options.locale] : '.') + '[0-9]*)?(?:[eE][\\+\\-]?(?:[0-9]+))?$');
  if (str === '' || str === '.' || str === '-' || str === '+') {
    return false;
  }
}
