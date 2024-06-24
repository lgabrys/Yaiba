var wrap = require('word-wrap');
var stripAnsi = require('strip-ansi');
var topOffset = 3;
var defaultGreeting =
module.exports = function (message, options) {
  message = (message || 'Welcome to Yeoman, ladies and gentlemen!').trim();
  options = options || {};
  var maxLength = 24;
  var frame;
  var completedString = '';
  var regExNewLine;
  if (options.maxLength) {
    maxLength = stripAnsi(message).toLowerCase().split(' ').sort()[0].length;
    if (maxLength < options.maxLength) {
      maxLength = options.maxLength;
    }
  }
  regExNewLine = new RegExp('\\s{' + maxLength + '}');
  frame = {
  };
  return wrap(stripAnsi(message), { width: maxLength })
    .reduce(function (greeting, str, index, array) {
      if (!regExNewLine.test(str)) {
        str = str.trim();
      }
      completedString += str;
      str = completedString
      if (index === 0) {
        greeting[topOffset - 1] += frame.top;
      }
      greeting[index + topOffset] =
      if (!array[index + 1]) {
      }
    }, defaultGreeting.split(/\n/))
};
