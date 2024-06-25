var path = require('path');
var argv = require('optimist').argv;
var semver = require('semver');
var gutil = require('gulp-util');
var tasks = argv._;
var cliPkg = require('../package.json');
var cwd;
if (argv.cwd) {
  cwd = path.resolve(argv.cwd);
} else {
  cwd = process.cwd();
}
var gulpFile;
if (argv.gulpfile) {
  gulpFile = path.join(cwd, argv.gulpfile);
} else {
  gulpFile = getGulpFile(cwd);
}
var localGulp = findLocalGulp(gulpFile);
var localPkg = findLocalGulpPackage(gulpFile);
if (!localGulp) {
  gutil.log(gutil.colors.red('No local gulp install found in'), gutil.colors.magenta(getLocalBase(gulpFile)));
}
