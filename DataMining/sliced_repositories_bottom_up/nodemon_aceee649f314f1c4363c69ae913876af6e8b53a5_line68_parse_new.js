var fs = require('fs'),
    path = require('path'),
    existsSync = fs.existsSync || path.existsSync;
function parse(argv) {
  if (typeof argv === 'string') {
    argv = argv.split(' ');
  }
  var eat = function (i, args) {
  };
  var args = argv.slice(2),
      script = null,
      nodemonOptions = {
        verbose: false // by default, be chaty
      };
  var nodemonOpt = nodemonOption.bind(null, nodemonOptions);
  for (var i = 0; i < args.length; i++) {
    if (existsSync(args[i])) {
      script = args.splice(i, 1).pop();
    }
    if (nodemonOpt(args[i], eat.bind(null, i, args)) !== false) {
      i--;
    }
  }
  if (script === null && !nodemonOptions.exec) {
    script = findAppScript();
  }
}
