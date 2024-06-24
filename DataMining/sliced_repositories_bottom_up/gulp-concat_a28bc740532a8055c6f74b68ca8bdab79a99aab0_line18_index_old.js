var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
module.exports = function(fileName, opt){
  if (!opt) opt = {};
  if (!opt.newLine) opt.newLine = gutil.linefeed;
  var firstFile = null;
  function bufferContents(file){
    if (file.isNull()) return; // ignore
    if (file.isStream()) return cb(new PluginError('gulp-concat',  'Streaming not supported'));
    if (!firstFile) firstFile = file;
  }
};
