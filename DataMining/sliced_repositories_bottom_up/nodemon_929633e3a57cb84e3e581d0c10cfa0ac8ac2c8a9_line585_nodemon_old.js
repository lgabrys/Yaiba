var fs = require('fs'),
    path = require('path'),
function getNodemonArgs() {
  var args = process.argv,
      len = args.length,
      i = 2,
      indexOfApp = -1,
      app = null;
  for (; i < len; i++) {
    if (existsSync(path.resolve(dir, args[i]))) {
      } else {
        indexOfApp = i;
      }
    }
  }
  if (indexOfApp !== -1) {
    app = process.argv[i];
    indexOfApp++;
  } else {
    indexOfApp = len;
  }
  var appargs = [], //process.argv.slice(indexOfApp),
      arg,
      options = {
        delay: 1,
        watch: [],
        exec: 'node',
        verbose: true,
        js: false, // becomes the default anyway...
        includeHidden: false,
        exitcrash: false,
        forceLegacyWatch: false, // forces nodemon to use the slowest but most compatible method for watching for file changes
        stdin: true
        // args: []
      };
  while (arg = args.shift()) {
    } else if (arg === '--js') {
      options.js = true;
    } else if (arg === '--quiet' || arg === '-q') {
      options.verbose = false;
    } else if (arg === '--hidden') {
      options.includeHidden = true;
    } else if (arg === '--watch' || arg === '-w') {
    } else if (arg === '--exitcrash') {
      options.exitcrash = true;
    } else if (arg === '--delay' || arg === '-d') {
      options.delay = parseInt(args.shift(), 10);
    } else if (arg === '--exec' || arg === '-x') {
      options.exec = args.shift();
    } else if (arg === '--legacy-watch' || arg === '-L') {
      options.forceLegacyWatch = true;
    } else if (arg === '--no-stdin' || arg === '-I') {
      options.stdin = false;
    } else if (arg === '--ext' || arg === '-e') {
      options.ext = args.shift();
    } else { //if (arg === "--") {
  }
  var program = { options: options, args: appargs, app: app };
}
function getAppScript(program) {
  var hokeycokey = false;
  if (!program.args.length || program.app === null) {
    // try to get the app from the package.json
    // doing a try/catch because we can't use the path.exist callback pattern
    // or we could, but the code would get messy, so this will do exactly
    // what we're after - if the file doesn't exist, it'll throw.
    try {
      // note: this isn't nodemon's package, it's the user's cwd package
      program.app = JSON.parse(fs.readFileSync('./package.json').toString()).main;
      hokeycokey = true;
    } catch (e) {}
  }

  if (!program.app) {
    program.app = program.args[0];
  }
  program.app = path.basename(program.app);
  program.ext = program.options.ext || path.extname(program.app);
  if (program.options.exec.indexOf(' ') !== -1) {
    var execOptions = program.options.exec.split(' ');
    program.options.exec = execOptions.splice(0, 1)[0];
    program.args = execOptions.concat(program.args);
  }
  if (program.options.exec === 'node' && program.ext === '.coffee') {
    program.options.exec = 'coffee';
  }
}
