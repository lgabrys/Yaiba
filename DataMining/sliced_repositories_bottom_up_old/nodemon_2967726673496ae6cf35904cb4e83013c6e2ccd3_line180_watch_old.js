var config = require('../config');
var utils = require('../utils');
function filterAndRestart(files) {
  if (!Array.isArray(files)) {
    files = [files];
  }
  if (files.length) {
    files = files.filter(Boolean).map(file => {
    });
    if (utils.isWindows) {
      files = files.map(f => {
      });
    }
    if (config.options.execOptions.script) {
    }
  }
}
