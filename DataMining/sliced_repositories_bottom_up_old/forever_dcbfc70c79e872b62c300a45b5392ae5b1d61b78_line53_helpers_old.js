    path = require('path'),
    spawn = require('child_process').spawn,
    forever = require('../lib/forever');
var helpers = exports;
helpers.assertTimes = function (script, times, options) {
  options.max = times;
  return {
    "should emit 'exit' when completed": function (err, child) {
    }
  }
};
helpers.spawn = function (args, options) {
  options.topic = function () {
    var self = this;
    args = [path.join(__dirname, '..', 'bin', 'forever')].concat(args);
    var child = spawn(process.argv[0], args),
        stdout = '',
        stderr = '';
    child.stdout.on('data', function (data) {
      stdout += data;
    });
    child.stderr.on('data', function (data) {
      stderr += data;
    });
    child.once('exit', function (exitCode) {
      setTimeout(function () {
        self.callback(exitCode, stdout, stderr);
      }, 200);
    });
  };
};
