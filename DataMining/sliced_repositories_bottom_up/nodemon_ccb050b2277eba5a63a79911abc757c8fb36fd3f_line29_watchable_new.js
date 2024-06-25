var utils = require('../utils'),
    path = require('path'),
    fs = require('fs');
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
  var watchFile = fs.openSync(watchFileName, 'w');
  if (watchFile < 0) {
    util.log.fail('Unable to write to temp directory. If you experience problems with file reloading, ensure ' + tmpdir + ' is writable.');
  }
};
