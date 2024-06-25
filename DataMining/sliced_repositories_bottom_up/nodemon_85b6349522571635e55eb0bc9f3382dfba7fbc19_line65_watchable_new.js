'use strict';
var utils = require('../utils'),
    path = require('path'),
    crypto = require('crypto'),
    fs = require('fs'),
    watchFileName,
    watchFile;

// Sends the callback true if fs.watch will work, false if it won't
//
var changeDetected = false;
function check(cb) {
  var tmpdir;
  watchable.cb = cb;
  changeDetected = false;
  if (utils.isWindows) {
    tmpdir = process.env.TEMP;
  } else if (process.env.TMPDIR) {
    tmpdir = process.env.TMPDIR;
  } else {
    tmpdir = '/tmp';
  }
  watchFileName = path.join(tmpdir, 'nodemonCheckFsWatch' + crypto.randomBytes(16).toString('hex'));
  watchFile = fs.openSync(watchFileName, 'w');
  if (watchFile < 0) {
    cb(true);
  }
  fs.watch(watchFileName, function() {
  });

}
var finish = function() {
  watchable.cb(false);
};

var watchable = module.exports = function (config, ready) {
  check(function(success) {
    config.system.useWatch = success;
  });
};
