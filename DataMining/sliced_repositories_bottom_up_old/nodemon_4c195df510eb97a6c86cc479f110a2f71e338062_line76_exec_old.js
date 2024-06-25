var path = require('path');
var utils = require('../utils');
function execFromPackage() {
}
function replace(map, str) {
  var re = new RegExp('{{(' + Object.keys(map).join('|') + ')}}');
  return str.replace(re, function (all, m) {
  });
}
function exec(nodemonOptions, execMap) {
  if (!execMap) {
    execMap = {};
  }
  if (!nodemonOptions.exec && !nodemonOptions.script) {
    var found = execFromPackage();
    if (found !== null) {
      if (found.exec) {
        nodemonOptions.exec = found.exec;
      }
      if (!nodemonOptions.script) {
        nodemonOptions.script = found.script;
      }
      if (Array.isArray(nodemonOptions.args) &&
        nodemonOptions.scriptPosition === null) {
        nodemonOptions.scriptPosition = nodemonOptions.args.length;
      }
    }
  }
  var options = utils.clone(nodemonOptions || {});
  var script = path.basename(options.script || '');
  var scriptExt = path.extname(script).slice(1);
  var extension = options.ext || scriptExt || 'js,json';
}
