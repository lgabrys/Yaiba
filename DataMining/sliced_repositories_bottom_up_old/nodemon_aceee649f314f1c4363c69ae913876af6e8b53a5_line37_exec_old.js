var path = require('path'),
    utils = require('../utils');
function exec(script, nodemonOptions, extentionMap) {
  if (!extentionMap) {
    extentionMap = {};
  }
  script = path.basename(script);
  var options = utils.clone(nodemonOptions || {}),
      scriptExt = path.extname(script),
      extention = options.ext || scriptExt;
  if (options.exec === undefined) {
    options.exec = 'node';
  }
  options.execArgs = [];
  if (options.exec.indexOf(' ') !== -1) {
    var execOptions = options.exec.split(' ');
    options.exec = execOptions.splice(0, 1)[0];
    options.execArgs = execOptions.join(' ');
  }
}
