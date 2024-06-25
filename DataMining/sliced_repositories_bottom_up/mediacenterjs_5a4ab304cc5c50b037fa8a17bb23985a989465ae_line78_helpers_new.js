module.exports = {
	/**
		This function reads a folder and writes the contents to a json
		@param req 			Request
		@param res			Response
		@param dir 			string, Directory with files 
		@param Writepath	string, Directory to save the JSON
		@param getDir 		boolean, true; to write only the dir, not the files inside the dir
		@param status		Returns with Callback. Gives status of function
		@param filetypes	Regex with acceptable filetypes
		@param callback		Callback function
	*/










	getLocalFiles: function (req, res, dir, writePath, getDir, fileTypes, callback) {
		var fs = require('fs')
		, colors = require('colors');

		var	status = null
		console.log('Getting files from:', dir .green)
		fs.readdir(dir,function(err,files){
			if (err){
				status = 'wrong or bad directory, please specify a existing directory';
				console.log('Helper error:',err .red);
				callback(status);
			}else{
				var allFiles = new Array();
				files.forEach(function(file){
					var fullPath = dir + file
					stats = fs.lstatSync(fullPath);
					if (stats.isDirectory(file)) {
						var subdir = file
						, subPath = dir + file
						, files = fs.readdirSync(subPath);
						if(getDir === true){
							allFiles.push(file);
						} else if (getDir === false) {
							files.forEach(function(file){
								if (file.match(fileTypes)){
									var subFile = 'subdir='+subdir+'&file='+file
									allFiles.push(subFile);
								}
							});
						}
					} else {
						if (file.match(fileTypes)){
							allFiles.push(file);
						}
					}
				});
				var allFilesJSON = JSON.stringify(allFiles, null, 4);
				fs.writeFile(writePath, allFilesJSON, function(e) {
					if (!e) {
						console.log('Helper: Writing json with files' .green);
					}else{
						console.log('Helper: Error writing json with files', e .red);
					};
				});
			};
		});
	},
	/**
		This funtion does an ajax call 
		@param url 			URL to call
		@param callback		Callback function
	*/

	 xhrCall: function (url,callback) {
		var request = require("request")
		request({
			headers: {"Accept": "application/json"},
		}, function (error, response, body) {
			}else{
				console.log('Helper: XHR Error',error .red);
				setTimeout(function(){console.log('Helper: Waiting for retry...' .yellow)},10000);
			}
		});
	},
}
