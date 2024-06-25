var file_utils = require('../../lib/utils/file-utils'),
	config = require('../../lib/handlers/configuration-handler').getConfiguration();
var SUPPORTED_FILETYPES = new RegExp("\.(mp3)","g");
exports.loadItems = function(req, res){
	file_utils.getLocalFiles(config.musicpath, SUPPORTED_FILETYPES, function(err, files) {
        var unique = {},
        albums = [];
        for(var i = 0, l = files.length; i < l; ++i){
            var albumDir = files[i].dir;
            var albumTitles = albumDir.substring(albumDir.lastIndexOf("\\")).replace(/^\\|\\$/g, '');
            if(unique.hasOwnProperty(albumTitles)) {
                continue;
            }

            //single
            if(albumTitles === '' && files[i].file !== undefined){
                albumTitles = files[i].file;
            }

            albums.push(albumTitles);
        };
	});
};
