/* Global Imports */
	, file_utils = require('../../lib/utils/file-utils')
	, dblite = require('dblite')
	, config = require('../../lib/handlers/configuration-handler').getConfiguration();
/* Constants */
var SUPPORTED_FILETYPES = new RegExp("\.(avi|mkv|mpeg|mov|mp4)","g");

exports.initMovieDb = function() {
	if(config.platform === 'OSX'){
		dblite.bin = "./bin/sqlite3/osx/sqlite3";
	}else {
		dblite.bin = "./bin/sqlite3/sqlite3";
	}
	var db = dblite('./lib/database/mcjs.sqlite');

	db.query("CREATE TABLE IF NOT EXISTS movies (local_name TEXT PRIMARY KEY,original_name VARCHAR, poster_path VARCHAR, backdrop_path VARCHAR, imdb_id INTEGER, rating VARCHAR, certification VARCHAR, genre VARCHAR, runtime VARCHAR, overview TEXT, cd_number VARCHAR)");
	db.on('info', function (text) { console.log(text) });
	db.on('error', function (err) { console.error('Database error: ' + err) });

	return db;
};

exports.loadItems = function (req, res){
	file_utils.getLocalFiles(config.moviepath, SUPPORTED_FILETYPES, function(err, files) {
		var movies = [];
		for(var i = 0, l = files.length; i < l; ++i){
			var movieFiles = files[i].file;
			var movieTitles = movieFiles.substring(movieFiles.lastIndexOf("/")).replace(/^\/|\/$/g, '');
			//single
			if(movieTitles === '' && files[i].file !== undefined){
				movieTitles = files[i].file;
			}
			movies.push(movieTitles.split("/").pop());
		}
	});
};
