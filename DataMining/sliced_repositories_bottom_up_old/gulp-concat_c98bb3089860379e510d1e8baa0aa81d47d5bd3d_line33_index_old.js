var path = require('path');
var gutil = require('gulp-util');
var PluginError = gutil.PluginError;
var File = gutil.File;
var Concat = require('concat-with-sourcemaps');
module.exports = function(file, opt) {
  if (!file) throw new PluginError('gulp-concat', 'Missing file option for gulp-concat');
  if (!opt) opt = {};
  if (typeof opt.newLine !== 'string') opt.newLine = gutil.linefeed;
  var firstFile = null;
  var fileName = file;
  if (typeof file !== 'string') {
    fileName = path.basename(file.path);
    firstFile = new File(file);
  }
  var concat = null;
  function bufferContents(file) {
    if (!firstFile) firstFile = file;
    if (!concat) concat = new Concat(!!firstFile.sourceMap, fileName, opt.newLine);
  }
};
