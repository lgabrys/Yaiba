var fs = require('fs');
var path = require('path');
function loadFile(options, config, dir, ready) {
  if (!ready) {
    ready = function () {};
  }
  var filename = options.configFile || path.join(dir, 'nodemon.json');
  fs.readFile(filename, 'utf8', function (err, data) {
    var settings = {};
    try {
      settings = JSON.parse(data);
    } catch (e) {
  });
}
