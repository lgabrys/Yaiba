
exports = module.exports = require('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
/**
 * Colors.
 */
exports.colors = [
];
function useColors() {
}
exports.formatters.j = function(v) {
};
function formatArgs() {
  var args = arguments;
  var useColors = this.useColors;
  args[0] = (useColors ? '%c' : '')
    + this.namespace
    + (useColors ? '%c ' : ' ')
    + args[0]
    + (useColors ? '%c ' : ' ')
    + '+' + exports.humanize(this.diff);
  if (!useColors) return args;
  var c = 'color: ' + this.color;
}
