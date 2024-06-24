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
  var extension = options.ext || (scriptExt ? scriptExt + ',json' : 'js,json');
  var execDefined = !!options.exec;
  if (!options.exec && execMap[scriptExt] !== undefined) {
    options.exec = execMap[scriptExt];
    execDefined = true;
  }
  options.execArgs = [];
  if (Array.isArray(options.exec)) {
    options.execArgs = options.exec;
    options.exec = options.execArgs.shift();
  }
  if (options.exec === undefined) {
    options.exec = 'node';
  } else {
    var substitution = replace.bind(null, {
      filename: options.script,
      pwd: process.cwd(),
    });
    var newExec = substitution(options.exec);
    if (newExec !== options.exec &&
      options.exec.indexOf('{{filename}}') !== -1) {
      options.script = null;
    }
    options.exec = newExec;
    var newExecArgs = options.execArgs.map(substitution);
    if (newExecArgs.join('') !== options.execArgs.join('')) {
      options.execArgs = newExecArgs;
    }
  }
  if (options.exec === 'node' && options.nodeArgs && options.nodeArgs.length) {
    options.execArgs = options.execArgs.concat(options.nodeArgs);
  }
  // note: indexOf('coffee') handles both .coffee and .litcoffee
  if (!execDefined && options.exec === 'node' &&
    scriptExt.indexOf('coffee') !== -1) {
    options.exec = 'coffee';
    var leadingArgs = (options.args || []).splice(0, options.scriptPosition);
    options.execArgs = options.execArgs.concat(leadingArgs);
    options.scriptPosition = 0;
    if (options.execArgs.length > 0) {
      // because this is the coffee executable, we need to combine the exec args
      // into a single argument after the nodejs flag
      options.execArgs = ['--nodejs', options.execArgs.join(' ')];
    }
  }
  if (options.exec === 'coffee') {
    // don't override user specified extension tracking
    if (!options.ext) {
      extension = 'coffee,litcoffee,js,json';
    }
    if (utils.isWindows) {
      options.exec += '.cmd';
    }
  }
  extension = extension.match(/\w+/g).join(',');
}
