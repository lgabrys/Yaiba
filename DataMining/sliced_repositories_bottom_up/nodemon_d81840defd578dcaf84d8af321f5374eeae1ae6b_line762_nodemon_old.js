var fs = require('fs'),
    util = require('util'),
    childProcess = require('child_process'),
    dirs = [],
    path = require('path'),
    exists = fs.exists || path.exists, // yay, exists moved from path to fs in 0.7.x ... :-\
    existsSync = fs.existsSync || path.existsSync,

    spawn = childProcess.spawn,
    meta = JSON.parse(fs.readFileSync(__dirname + '/package.json')),
    exec = childProcess.exec,
    flag = './.monitor',
    child = null,
    monitor = null,
    ignoreFilePath = './.nodemonignore',
    ignoreFileWatcher = null,
    oldIgnoreFilePath = './nodemon-ignore',
    ignoreFiles = [],
    reIgnoreFiles = null,
    timeout = 1000, // check every 1 second
    restartDelay = 0, // controlled through arg --delay 10 (for 10 seconds)
    restartTimer = null,
    lastStarted = Date.now(),
    statOffset = 0, // stupid fix for https://github.com/joyent/node/issues/2705
    platform = process.platform,
    isWindows = platform === 'win32',
    noWatch = (platform !== 'win32') || !fs.watch, //  && platform !== 'linux' - removed linux fs.watch usage #72
    watchFile = platform === 'darwin' ? fs.watchFile : fs.watch, // lame :(
    watchWorks = true, // whether or not fs.watch actually works on this platform, tested and set later before starting
    // create once, reuse as needed
    reEscComments = /\\#/g,
    reUnescapeComments = /\^\^/g, // note that '^^' is used in place of escaped comments
    reComments = /#.*$/,
    reTrim = /^(\s|\u00A0)+|(\s|\u00A0)+$/g,
    reEscapeChars = /[.|\-[\]()\\]/g,
    reAsterisk = /\*/g,
    // Flag to distinguish an app crash from intentional killing (used on Windows only for now)
    killedAfterChange = false,
    // Make this the last call so it can use the variables defined above (specifically isWindows)
    program = getNodemonArgs(),
    watched = [];
var testAndStart = function() {
  var ready = function () {
    watchFileChecker.check(function(success) {
      watchWorks = success;
      startNode();
    });
  };
  if (noWatch) {
    exec('find -L /dev/null -type f -mtime -1s -print', function(error, stdout, stderr) {
      if (error) {
        } else {
          noWatch = false;
        }
      } else {
    });
  } else {
}
var watchFileChecker = {};
watchFileChecker.check = function(cb) {
  var tmpdir,
      seperator = '/';

  this.cb = cb;
  this.changeDetected = false;
  if (isWindows) {
    seperator = '\\';
    tmpdir = process.env.TEMP;
  } else if (process.env.TMPDIR) {
    tmpdir = process.env.TMPDIR;
  } else {
    tmpdir = '/tmp';
  }
  var watchFileName = tmpdir + seperator + 'nodemonCheckFsWatch';
  var watchFile = fs.openSync(watchFileName, 'w');
  if (!watchFile) {
    util.log('\x1B[32m[nodemon] Unable to write to temp directory. If you experience problems with file reloading, ensure ' + tmpdir + ' is writable.\x1B[0m');
    cb(true);
    return;
  }
  fs.watch(watchFileName, function(event, filename) {
    if (watchFileChecker.changeDetected) { return; }
    watchFileChecker.changeDetected = true;
    cb(true);
  });
  // This should trigger fs.watch, if it works
  fs.writeSync(watchFile, '1');
  fs.unlinkSync(watchFileName);

  setTimeout(function() { watchFileChecker.verify(); }, 250);
};
watchFileChecker.verify = function() {
  if (!this.changeDetected) {
    this.cb(false);
  }
};
function startNode() {
  lastStarted = Date.now();
  child = spawn(program.options.exec, program.args, {
  });
  child.on('exit', function (code, signal) {
    if (killedAfterChange) {
      killedAfterChange = false;
    }
    } else if (code === 0) { // clean exit - wait until file change to restart
      child = null;
    } else if (program.options.exitcrash) {
    } else {
      child = null;
    }
  });
}
function startMonitor() {
  if ((noWatch || watchWorks) && !program.options.forceLegacyWatch) {
    changeFunction(lastStarted, function (files) {
      if (files.length) {
        if (files.length) {
          restartTimer = setTimeout(function () {
          }, restartDelay);
        }
      }
    });
  } else {
    changedSince(lastStarted, function (files) {
      if (files.length) {
        if (files.length) {
          restartTimer = setTimeout(function () {
          }, restartDelay);
        }
      }
    });
  }
}
function killNode() {
  if (child !== null) {
    if (isWindows) {
      killedAfterChange = true;
    } else {
  } else {
}
function addIgnoreRule(line, noEscape) {
  // remove comments and trim lines
  // this mess of replace methods is escaping "\#" to allow for emacs temp files
  if (!noEscape) {
    if (line = line.replace(reEscComments, '^^').replace(reComments, '').replace(reUnescapeComments, '#').replace(reTrim, '')) {
       ignoreFiles.push(line.replace(reEscapeChars, '\\$&').replace(reAsterisk, '.*'));
    }
  } else if (line = line.replace(reTrim, '')) {
  }
  reIgnoreFiles = new RegExp(ignoreFiles.join('|'));
}
function readIgnoreFile(curr, prev) {
  var hadfile = false;
  } else {
    if (ignoreFileWatcher) {
      hadfile = true;
    }
  }
  function checkTimer() {
    if (existsSync(ignoreFilePath)) {
      ignoreFileWatcher = watchFile(ignoreFilePath, { persistent: false }, readIgnoreFile);
    } else if (hadfile) {
  }
}
function getNodemonArgs() {
  var args = process.argv,
      len = args.length,
      i = 2,
      dir = process.cwd(),
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
}
function getAppScript(program) {
  var hokeycokey = false;
  if (!program.args.length || program.app === null) {
    try {
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
  if (program.options.exec === 'coffee') {
    if (!program.options.ext) {
      program.ext = '.coffee|.js';
    }
    if (!program.options.exec || program.options.exec === 'node') {
      program.options.exec = 'coffee';
    }
    if (isWindows) {
      program.options.exec += '.cmd';
    }
  }
  if (program.ext.indexOf(',') !== -1 || program.ext.indexOf('*.') !== -1) {
    program.ext = program.ext.replace(/,/g, '|').split('|').map(function (item) {
      return '.' + item.replace(/^[\*\.]+/, '');
    }).join('|');
  }
}
function findStatOffset() {
  var filename = './.stat-test';
  fs.writeFile(filename, function (err) {
    fs.stat(filename, function (err, stat) {
      statOffset = stat.mtime.getTime() - new Date().getTime();
    });
  });
}
if (program.options.delay) {
  restartDelay = program.options.delay * 1000;
}
if (program.options.ext) {
  addIgnoreRule('^((?!' + program.options.ext.replace(/\./g, '\\.') + '$).)*$', true);
}
