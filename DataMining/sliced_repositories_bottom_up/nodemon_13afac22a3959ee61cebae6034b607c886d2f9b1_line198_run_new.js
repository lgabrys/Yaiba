var utils = require('../utils');
var bus = utils.bus;
var childProcess = require('child_process');
var spawn = childProcess.spawn;
var fork = childProcess.fork;
var config = require('../config');
var child = null; // the actual child process we spawn
var killedAfterChange = false;
var restart = null;
function run(options) {
  var cmd = config.command.raw;
  var runCmd = !options.runOnChangeOnly || config.lastStarted !== 0;
  restart = run.bind(this, options);
  run.restart = restart;
  config.lastStarted = Date.now();
  var stdio = ['pipe', 'pipe', 'pipe'];
  if (config.options.stdout) {
    stdio = ['pipe', process.stdout, process.stderr];
  }
  if (config.options.stdin === false) {
    stdio = [process.stdin, process.stdout, process.stderr];
  }
  var sh = 'sh';
  var shFlag = '-c';
  const binPath = process.cwd() + '/node_modules/.bin';
  const spawnOptions = {
    env: Object.assign({}, process.env, options.execOptions.env, {
      PATH: binPath + ':' + process.env.PATH,
    }),
    stdio: stdio,
  }
  var executable = cmd.executable;
  if (utils.isWindows) {
    if (executable.indexOf('/') !== -1) {
      executable = executable.split(' ').map((e, i) => {
      }).join(' ');
    }
    sh = process.env.comspec || 'cmd';
    shFlag = '/d /s /c';
    spawnOptions.windowsVerbatimArguments = true;
  }
  var args = runCmd ? utils.stringify(executable, cmd.args) : ':';
  var spawnArgs = [sh, [shFlag, args], spawnOptions];
  const shouldFork =
  if (shouldFork) {
    var forkArgs = cmd.args.slice(1);
    child = fork(options.execOptions.script, forkArgs, {
    });
  } else {
    child = spawn.apply(null, spawnArgs);
  }
  if (config.required) {
    var emit = {
      stdout: function (data) {
        bus.emit('stdout', data);
      },
      stderr: function (data) {
        bus.emit('stderr', data);
      },
    };
    } else {
      bus.stdout = child.stdout;
      bus.stderr = child.stderr;
    }
  }
  child.on('error', function (error) {
  });
  child.on('exit', function (code, signal) {
    if (killedAfterChange) {
      killedAfterChange = false;
      signal = config.signal;
    }
    if (utils.isWindows && signal === 'SIGTERM') {
      signal = config.signal;
    }
    if (signal === config.signal || code === 0) {
      bus.emit('exit', signal);
    } else {
  });
}
