var fs = require('fs'),
    path = require('path'),
    changedSince = require('./changed-since'),
    utils = require('../utils'),
    bus = utils.bus,
    match = require('./match'),
    config = require('../config'),
    childProcess = require('child_process'),
    exec = childProcess.exec,
    restartTimer = null,
    watched = [],
    watchers = [];
function reset() {
  watched.length = 0;
}
bus.on('config:update', function () {
  if (config.system.useFind) {
    changeFunction = function (lastStarted, callback) {
    };
  } else if (config.system.useWatch || config.system.useWatchFile) {
    var watchFile = config.system.useWatch === false && (config.system.useWatchFile || config.options.legacyWatch),
    changeFunction = function (lastStarted, callback) {
      function watch(err, dir) {
        try {
          if (watched.indexOf(dir) === -1 && ignoredFilter(dir)) {
            var watcher = fs[watchMethod](dir, { persistent: false }, function (event, filename) {

              var filepath;

              if (typeof filename === 'string') {
                filepath = path.join(dir, filename || '');
              } else { // was called from watchFile
                filepath = dir;
              }

              callback([filepath]);
            });
            watched.push(dir);
            watchers.push(watcher);
          }
          fs.readdir(dir, function (err, files) {
            files.forEach(function (rawfile) {
              var file = path.join(dir, rawfile);
              if (watched.indexOf(file) === -1 && ignoredFilter(file)) {
                fs.lstat(file, function (err, stat) {
                  if (err || !stat) { return; }

                  // if we're using fs.watch, then watch directories
                  if (!watchFile && stat.isDirectory()) {
                    // recursive call to watch()
                    fs.realpath(file, watch);
                  } else {
                    // if we're in legacy mode, i.e. Vagrant + editing over
                    // shared drive, then watch the individual file
                    if (watchFile) {
                      fs.realpath(file, watch);
                    } else if (ignoredFilter(file)) {
                      watched.push(file);
                    }
                  }
                });
              }
            });
          });
        } catch (e) {
      }
    };
  } else {
});
