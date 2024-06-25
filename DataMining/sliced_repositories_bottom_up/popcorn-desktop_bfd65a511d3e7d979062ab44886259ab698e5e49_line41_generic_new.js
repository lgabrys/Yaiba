(function(App) {
	var request = require('request');
	var fs = require('fs');
	var path = require('path');
	var downloadZip = function(data, callback) {
		var filePath = data.path;
		var fileExt = path.extname(filePath);
		var newName = filePath.substring(0,filePath.lastIndexOf(fileExt)) + '.srt';
		var zipPath = filePath.substring(0,filePath.lastIndexOf(fileExt)) + '.zip';
		var req = request(
		);
		req.on('end', function() {
			fs.unlink(zipPath, function(err){});
			win.debug('Subtitle extracted to : '+ newName);
		});
	};
})(window.App);
