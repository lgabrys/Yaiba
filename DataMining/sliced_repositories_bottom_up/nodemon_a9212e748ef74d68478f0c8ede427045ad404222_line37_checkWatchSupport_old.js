var utils = require('../utils'),
    watchable = require('./watchable'),
    fs = require('fs'),
    checkComplete = false;
function checkWatchSupport(config, callback) {
  if (checkComplete) {
    return callback(config);
  }
  var ready = function () {
    checkComplete = true;
  };
  var alternativeCheck = function () {
    watchable.check(function(success) {
      // whether or not fs.watch actually works on this platform, tested and set
      // later before starting
      config.system.watchWorks = success;
    });
  };
  config.system.noWatch = !utils.isWindows || !fs.watch;
}
