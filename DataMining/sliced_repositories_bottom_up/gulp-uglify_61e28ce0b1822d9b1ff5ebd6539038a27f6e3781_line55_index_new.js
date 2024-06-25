	uglify = require('uglify-js'),
	merge = require('deepmerge'),
	PluginError = require('gulp-util/lib/PluginError'),
	reSourceMapComment = /\n\/\/# sourceMappingURL=.+?$/,
	pluginName = 'gulp-uglify';
module.exports = function(opt) {
	function minify(file, encoding, callback) {
		var options = merge(opt || {}, {
			fromString: true,
			output: {}
		});
		var mangled,
			originalSourceMap;
		if (file.sourceMap) {
			options.outSourceMap = file.relative;
			if (file.sourceMap.mappings !== '') {
				options.inSourceMap = file.sourceMap;
			}
			originalSourceMap = file.sourceMap;
		}
		if (options.preserveComments === 'all') {
			options.output.comments = true;
		} else if (options.preserveComments === 'some') {
			// preserve comments with directives or that start with a bang (!)
			options.output.comments = /^!|@preserve|@license|@cc_on/i;
		} else if (typeof options.preserveComments === 'function') {
			options.output.comments = options.preserveComments;
		}
		try {
			mangled = uglify.minify(String(file.contents), options);
			file.contents = new Buffer(mangled.code.replace(reSourceMapComment, ''));
		} catch (e) {
			return callback(new PluginError(pluginName, e.message || e.msg, {
				fileName: file.path,
				lineNumber: e.line,
				stack: e.stack,
				showStack: false
			}));
		}
	}
};
