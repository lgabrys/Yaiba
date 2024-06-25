		Vinyl = require('vinyl'),
		gulpUglify = require('../'),
		uglifyjs = require('uglify-js'),
		concat = require('gulp-concat'),
		sourcemaps = require('gulp-sourcemaps');
var testContents1Input = '(function(first, second) {\n    console.log(first + second);\n}(5, 10));\n';
var testContents2Input = '(function(alert) {\n    alert(5);\n}(alert));\n';
var testConcatExpected = uglifyjs.minify(testContents1Input + '\n' + testContents2Input, {fromString: true}).code;
