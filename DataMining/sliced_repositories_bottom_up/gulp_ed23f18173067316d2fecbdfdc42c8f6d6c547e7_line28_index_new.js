var util = require('util');
var Orchestrator = require('orchestrator');
var gutil = require('gulp-util');
var deprecated = require('deprecated');
var vfs = require('vinyl-fs');
function Gulp() {
}
Gulp.prototype.task = Gulp.prototype.add;
Gulp.prototype.run = function() {
  var tasks = arguments.length ? arguments : ['default'];
};
Gulp.prototype.src = vfs.src;
Gulp.prototype.dest = vfs.dest;
Gulp.prototype.watch = function(glob, opt, fn) {
  if (typeof opt === 'function') {
  }
};
