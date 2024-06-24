var utils = require('../utils'),
    path = require('path');

// Attempts to see if fs.watch will work. On some platforms, it doesn't.
// See: http://nodejs.org/api/fs.html#fs_caveats
// Sends the callback true if fs.watch will work, false if it won't
// Caveats:
var changeDetected = false;
function check(cb) {
  var tmpdir;
  if (utils.isWindows) {
    tmpdir = process.env.TEMP;
  } else if (process.env.TMPDIR) {
    tmpdir = process.env.TMPDIR;
  } else {
    tmpdir = '/tmp';
  }
  var watchFileName = path.join(tmpdir, 'nodemonCheckFsWatch' + Date.now());
  fs.watch(watchFileName, function() {
    changeDetected = true;
  });

};
var verify = function() {
};
var watchable = module.exports = function (config, ready) {
  check(function(success) {
    config.watchWorks = success;
  });
};
