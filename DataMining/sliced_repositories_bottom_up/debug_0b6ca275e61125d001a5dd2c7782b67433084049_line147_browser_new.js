

exports = module.exports = require('./debug');
exports.log = log;
exports.formatArgs = formatArgs;
exports.save = save;
exports.load = load;
exports.useColors = useColors;
exports.storage = 'undefined' != typeof chrome
               && 'undefined' != typeof chrome.storage
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
  var c = 'color: ' + this.color;
  args = [args[0], c, 'color: inherit'].concat(Array.prototype.slice.call(args, 1));
  var index = 0;
  var lastC = 0;
  args[0].replace(/%[a-z%]/g, function(match) {
    index++;
    if ('%c' === match) {
      lastC = index;
    }
  });
}
function log() {
}
function save(namespaces) {
  try {
    if (null == namespaces) {
      exports.storage.removeItem('debug');
    } else {
      exports.storage.debug = namespaces;
    }
  } catch(e) {}
}
function load() {
  var r;
  try {
    r = exports.storage.debug;
  } catch(e) {}
  if ('env' in (typeof process === 'undefined' ? {} : process)) {
  }
}
