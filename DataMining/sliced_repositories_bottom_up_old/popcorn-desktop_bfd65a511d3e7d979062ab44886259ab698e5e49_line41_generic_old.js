(function(App) {
	var request = require('request');
	var fs = require('fs');
	var path = require('path');
	var downloadZip = function(data, callback) {
		var filePath = data.path;
		var fileExt = path.extname(filePath);
		var zipPath = filePath.substring(0,filePath.lastIndexOf(fileExt)) + '.zip';
		var unzipPath = filePath.substring(0,filePath.lastIndexOf(fileExt));
		unzipPath = unzipPath.substring(0, unzipPath.lastIndexOf(path.sep));
		var req = request(
		);
		req.on('end', function() {
			fs.unlink(zipPath, function(err){});
			win.debug('Subtitle extracted to : '+ unzipPath);
		});
	};
})(window.App);
