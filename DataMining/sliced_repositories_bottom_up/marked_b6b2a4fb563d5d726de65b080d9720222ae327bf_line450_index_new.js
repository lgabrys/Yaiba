    marked = require('../'),

function load(options) {
  options = options || {};

}
function runTests(engine, options) {
  if (typeof engine !== 'function') {
    options = engine;
    engine = null;
  }
  engine = engine || marked;
  options = options || {};
}
function testFile(engine, file, filename, index) {
  var opts = Object.keys(file.options),
  if (marked._original) {
    marked.defaults = marked._original;
  }
  if (opts.length) {
    marked._original = marked.defaults;
    marked.defaults = {};
    Object.keys(marked._original).forEach(function(key) {
      marked.defaults[key] = marked._original[key];
    });
    opts.forEach(function(key) {
      if (marked.defaults.hasOwnProperty(key)) {
        marked.defaults[key] = file.options[key];
      }
    });
  }
}
function parseArg(argv) {
  argv = Array.isArray(argv) ? argv.slice(2) : [];
}
