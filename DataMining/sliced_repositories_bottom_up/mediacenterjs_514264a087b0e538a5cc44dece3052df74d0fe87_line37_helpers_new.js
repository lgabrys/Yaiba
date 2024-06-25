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
		var	status = null
		console.log('Getting files from:', dir)
		fs.readdir(dir,function(err,files){
			if (err){
				status = 'wrong or bad directory, please specify a existing directory';
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
							console.log('found dir:', file)
							allFiles.push(file);
						} else if (getDir === false) {
							files.forEach(function(file){
								if (file.match(fileTypes)){
									var subFile = 'subdir='+subdir+'&file='+file
								}
							});
						}
					} else {
				});
			};
		});
	},
}
