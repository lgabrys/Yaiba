var fs = require('fs'),
    platform = process.platform,
    noWatch = (platform !== 'win32') || !fs.watch, //  && platform !== 'linux' - removed linux fs.watch usage #72
if (noWatch) {
  exec('find -L /dev/null -type f -mtime -1s -print', function(error, stdout, stderr) {
    if (error) {
      } else {
        noWatch = false;
      }
    }
  });
}
function startMonitor() {
  var changeFunction;
  if (noWatch) {
    changeFunction = function (lastStarted, callback) {
    }
  } else {
    changeFunction = function (lastStarted, callback) {
      var watch = function (err, dir) {
        try {
          fs.watch(dir, { persistent: false }, function (event, filename) {
            callback([dir + '/' + filename]);
          });
        } catch (e) {
      }
    }
  }
}
