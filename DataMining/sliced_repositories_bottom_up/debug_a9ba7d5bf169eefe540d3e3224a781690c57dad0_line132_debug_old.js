var tty = require('tty');
var isatty = tty.isatty(2);
function debug(name) {
  return isatty
}
