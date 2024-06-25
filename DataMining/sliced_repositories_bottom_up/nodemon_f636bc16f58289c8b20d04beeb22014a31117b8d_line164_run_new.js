var utils = require('../utils'),
    bus = utils.bus,
    noop = function() {},
    restart = null;
function run(options) {
  restart = run.bind(this, options);
  run.restart = restart;
  child.on('exit', function (code, signal) {
    if (signal === 'SIGUSR2' || code === 0) {
    } else {
    }
  });
  run.kill = function () {
  };
}
run.command = function (options) {
  var executable = options.execOptions.exec,
      args = [];
  if (options.script) {
    args.splice((options.scriptPosition || 0) + options.execOptions.execArgs.length, 0, options.script);
  }
};
