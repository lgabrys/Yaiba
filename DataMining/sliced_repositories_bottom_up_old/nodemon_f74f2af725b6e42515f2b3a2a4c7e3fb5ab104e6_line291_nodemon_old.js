var fs = require('fs'),
    util = require('util'),
    path = require('path'),
    meta = JSON.parse(fs.readFileSync(__dirname + '/package.json')),
    program = getNodemonArgs(),
    restartDelay = 0, // controlled through arg --delay 10 (for 10 seconds)
    reEscComments = /\\#/g,
    reUnescapeComments = /\^\^/g, // note that '^^' is used in place of escaped comments
    reComments = /#.*$/,
    reTrim = /^(\s|\u00A0)+|(\s|\u00A0)+$/g,
function addIgnoreRule(line, noEscape) {
  if (!noEscape) {
    if (line = line.replace(reEscComments, '^^').replace(reComments, '').replace(reUnescapeComments, '#').replace(reTrim, '')) {
    }
  } else if (line = line.replace(reTrim, '')) {
  }
}
function getNodemonArgs() {
  var args = process.argv,
      len = args.length,
      i = 2,
      dir = process.cwd(),
      indexOfApp = -1;
  for (; i < len; i++) {
    if (path.existsSync(dir + '/' + args[i])) {
      } else {
        indexOfApp = i;
      }
    }
  }
  if (indexOfApp == -1) {
    indexOfApp = len;
  }
  var appargs = process.argv.slice(indexOfApp),
      app = appargs[0],
      nodemonargs = process.argv.slice(2, indexOfApp),
      arg,
      options = {
        delay: 1,
        watch: [],
        exec: 'node',
        verbose: true,
        js: false, // becomes the default anyway...
        includeHidden: false,
        exitcrash: false
        // args: []
      };
  while (arg = nodemonargs.shift()) {
    } else if (arg == '--js') {
      options.js = true;
    } else if (arg == '--quiet' || arg == '-q') {
      options.verbose = false;
    } else if (arg == '--hidden') {
      options.includeHidden = true;
    } else if (arg === '--watch' || arg === '-w') {
    } else if (arg === '--exitcrash') {
      options.exitcrash = true;
    } else if (arg === '--delay' || arg === '-d') {
      options.delay = parseInt(nodemonargs.shift());
    } else if (arg === '--exec' || arg === '-x') {
      options.exec = nodemonargs.shift();
    } else { //if (arg === "--") {
  }
  var program = { nodemon: nodemonargs, options: options, args: appargs, app: app };
}
function getAppScript(program) {
  if (!program.args.length) {
    // try to get the app from the package.json
    // doing a try/catch because we can't use the path.exist callback pattern
    // or we could, but the code would get messy, so this will do exactly
    // what we're after - if the file doesn't exist, it'll throw.
    try {
      // note: this isn't nodemon's package, it's the user's cwd package
      program.app = JSON.parse(fs.readFileSync('./package.json').toString()).main;
    } catch (e) {
  } else {
    program.app = program.args.slice(0, 1);
  }
  program.app = path.basename(program.app);
  program.ext = path.extname(program.app);
  if (program.ext === '.coffee') {
    program.ext = '.coffee|.js';
    program.exec = 'coffee';
  }
}
