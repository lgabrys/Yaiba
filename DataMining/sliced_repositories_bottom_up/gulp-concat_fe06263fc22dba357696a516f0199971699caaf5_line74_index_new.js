var path = require('path');
var gutil = require('gulp-util');
var File = gutil.File;
var Concat = require('concat-with-sourcemaps');
module.exports = function(file, opt) {
  opt = opt || {};
  if (typeof opt.newLine !== 'string') {
    opt.newLine = gutil.linefeed;
  }
  var isUsingSourceMaps = false;
  var firstFile;
  var fileName;
  var concat;
  if (typeof file === 'string') {
    fileName = file;
  } else if (typeof file.path === 'string') {
    fileName = path.basename(file.path);
    firstFile = new File(file);
  } else {
  function bufferContents(file, enc, cb) {
    if (file.sourceMap && isUsingSourceMaps === false) {
      isUsingSourceMaps = true;
    }
    if (!firstFile) {
      firstFile = file;
    }
    if (!concat) {
      concat = new Concat(isUsingSourceMaps, fileName, opt.newLine);
    }
  }
  function endStream(cb) {
    if (!firstFile || !concat) {
    }
  }
};
