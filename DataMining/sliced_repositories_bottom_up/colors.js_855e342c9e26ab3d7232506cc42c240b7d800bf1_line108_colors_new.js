var colors = {};
colors.themes = {};
var util = require('util');
var ansiStyles = colors.styles = require('./styles');
colors.supportsColor = require('./system/supports-colors').supportsColor;
if (typeof colors.enabled === 'undefined') {
  colors.enabled = colors.supportsColor() !== false;
}
colors.enable = function() {
  colors.enabled = true;
};
colors.disable = function() {
  colors.enabled = false;
};
colors.stripColors = colors.strip = function(str) {
  return ('' + str).replace(/\x1B\[\d+m/g, '');
};
var stylize = colors.stylize = function stylize(str, style) {
  if (!colors.enabled) {
    return str+'';
  }

  return ansiStyles[style].open + str + ansiStyles[style].close;
};
var styles = (function() {
  ansiStyles.grey = ansiStyles.gray;
  Object.keys(ansiStyles).forEach(function(key) {
    ansiStyles[key].closeRe =
  });
})();
function applyStyle() {
  var args = Array.prototype.slice.call(arguments);
  var str = args.map(function(arg) {
    return arg.constructor === String ? arg : util.inspect(arg);
  }).join(' ');
}
