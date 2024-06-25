var fs = require('fs'),
    util = require('util'),
    platform = process.platform,
    isWindows = platform === 'win32',
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
  var watchFileName = tmpdir + seperator + 'nodemonCheckFsWatch' + Date.now();
  var watchFile = fs.openSync(watchFileName, 'w');
  if (watchFile < 0) {
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
