  qunit = require("gulp-qunit"),
  uglify = require('gulp-uglify'),
  clean = require('gulp-clean'),
  bump = require('gulp-bump'),
  replace = require('gulp-replace'),
  rename = require('gulp-rename'),
  browserify = require('gulp-browserify'),
  SRC = 'index.js',
  DEST = 'dist',
  SRC_COMPILED = 'underscore.string.js',
  MIN_FILE = 'underscore.string.min.js',
  TEST_SUITES = ['test/test.html', 'test/test_standalone.html', 'test/test_underscore/index.html'],
  VERSION_FILES = ['./package.json', './component.json'];
