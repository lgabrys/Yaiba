var path = require('path');
var gutil = require('gulp-util');
var File = gutil.File;
module.exports = function(file, opt) {
  opt = opt || {};
  if (typeof opt.newLine !== 'string') {
    opt.newLine = gutil.linefeed;
  }
  var firstFile;
  } else if (typeof file.path === 'string') {
    firstFile = new File(file);
  } else {
  function bufferContents(file, enc, cb) {
    if (!firstFile) {
      firstFile = file;
    }
  }
  function endStream(cb) {
    if (!firstFile) {
    }
  }
};
