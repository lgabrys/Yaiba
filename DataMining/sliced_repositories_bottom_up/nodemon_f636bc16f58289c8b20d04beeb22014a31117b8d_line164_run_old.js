var utils = require('../utils'),
    bus = utils.bus,
    childProcess = require('child_process'),
    spawn = childProcess.spawn,
    child = null, // the actual child process we spawn
    noop = function() {},
    restart = null;
function run(options) {
  var command = run.command(options),
  restart = run.bind(this, options);
  run.restart = restart;
  if (nodeMajor >= 8) {
    child = spawn(command.executable, command.args, {
    });
  } else {
    child = spawn(command.executable, command.args);
  }
  child.on('exit', function (code, signal) {
    if (signal === 'SIGUSR2' || code === 0) {
      } else if (code === 0) { // clean exit - wait until file change to restart
        child = null;
      }
    } else {
      } else {
        child = null;
      }
    }
  });
  run.kill = function () {
  };
}
run.command = function (options) {
  var executable = options.execOptions.exec,
      args = [];
  if (options.script) {
    args.splice(options.scriptPosition + options.execOptions.execArgs.length, 0, options.script);
  }
};
