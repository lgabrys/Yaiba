var utils = require('../utils');
var config = require('../config');
var restart = null;
var path = require('path');
function run(options) {
  var cmd = config.command.raw;
  restart = run.bind(this, options);
  run.restart = restart;
  config.lastStarted = Date.now();
  var executable = cmd.executable;
  if (utils.isWindows) {
    if (executable.indexOf('/') !== -1) {
      executable = path.normalize(executable);
    }
    if (executable.indexOf(' ') !== -1 && executable[0] !== '\"'
      && executable[executable.length - 1] !== '\"') {
      executable = executable.replace(/\"/g, '');
    }
  }
  if (
    (cmd.args[0] || '').indexOf('-') === -1 &&
    executable === 'node' &&
    utils.version.major > 4
  ) {
    var forkArgs = cmd.args.slice(1);
  } else {
}
