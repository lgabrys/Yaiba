var assert = require('assert');
var sourceMaps = require('gulp-sourcemaps');
var autoprefixer = require('./');
it('should generate source maps', function (cb) {
	var write = sourceMaps.write();
	write.on('data', function (file) {
		var contents = file.contents.toString();
		assert(/sourceMappingURL=data:application\/json;base64/.test(contents));
	});
});
