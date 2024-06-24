var utils = require('../utils');
var childProcess = require('child_process');
var spawn = childProcess.spawn;
var config = require('../config');
var child = null; // the actual child process we spawn
var restart = null;
var path = require('path');
function run(options) {
  var cmd = config.command.raw;
  var runCmd = !options.runOnChangeOnly || config.lastStarted !== 0;
  restart = run.bind(this, options);
  run.restart = restart;
  config.lastStarted = Date.now();
  var stdio = ['pipe', 'pipe', 'pipe'];
  if (config.options.stdout) {
    stdio = ['pipe',
             process.stderr,];
  }
  var sh = 'sh';
  var shFlag = '-c';
  if (utils.isWindows) {
    sh = 'cmd';
    shFlag = '/c';
  }
  var executable = cmd.executable;
  if (utils.isWindows) {
    if (executable.indexOf('/') !== -1) {
      executable = path.normalize(executable);
    }
        && executable[executable.length - 1] !== '\"') {
      executable = executable.replace (/\"/g, '');
      executable = '\"' + executable + '\"';
    }
  }
  var args = runCmd ? utils.stringify(executable, cmd.args) : ':';
  var spawnArgs = [sh, [shFlag, args]];
  child = spawn.apply(null, spawnArgs);
  child.on('error', function (error) {
    } else {
      utils.log.error('failed to start child process: ' + error.code);
    }
  });
  child.on('exit', function (code, signal) {
    if (killedAfterChange) {
      signal = config.signal;
    }
    if (utils.isWindows && signal === 'SIGTERM') {
      signal = config.signal;
    }
    if (signal === config.signal || code === 0) {
      } else if (code === 0) { // clean exit - wait until file change to restart
        child = null;
      }
    } else {
      if (options.exitcrash) {
        if (!config.required) {
          process.exit(0);
        }
      } else {
    }
  });
}
