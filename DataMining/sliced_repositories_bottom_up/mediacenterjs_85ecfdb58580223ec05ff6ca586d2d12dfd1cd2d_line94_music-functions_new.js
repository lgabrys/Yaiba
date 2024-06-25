var file_utils = require('../../lib/utils/file-utils')
    , os = require('os')
    , metafetcher = require('../../lib/utils/metadata-fetcher')
	, config = require('../../lib/handlers/configuration-handler').getConfiguration()
	, music_playback_handler = require('./music-playback-handler');
var dblite = require('dblite')
if(os.platform() === 'win32'){
    dblite.bin = "./bin/sqlite3/sqlite3";
}
var db = dblite('./lib/database/mcjs.sqlite');
db.on('info', function (text) { console.log('Database info:', text) });
db.on('error', function (err) { console.error('Database error: ' + err) });

exports.loadItems = function(req, res){
};

exports.playTrack = function(req, res, track, album){
	music_playback_handler.startTrackPlayback(res, track);
};

exports.nextTrack = function(req, res, track, album){
	console.log('track', track)
    var currentTrack = track;
    db.query('SELECT * FROM tracks WHERE album = $album AND CAST(track as integer) > (SELECT track FROM tracks WHERE filename = $track) LIMIT 1 ',{album: album, track:currentTrack}, {
            title       : String,
            track       : Number,
            album       : String,
            artist      : String,
            year        : Number,
			filepath	: String
        },
        function(rows) {
            if (typeof rows !== 'undefined' && rows.length > 0){
                var nextTrack = rows[0].filename;
                if(currentTrack === nextTrack)
                console.log('NextTrack',nextTrack);
            } else {
            }
        }
    );
};
exports.randomTrack = function(req, res, track, album){
    db.query('SELECT * FROM $album ORDER BY RANDOM() LIMIT 1 ', { album: album }, {
            artist  : String,
            year    : Number,
        },
        function(rows) {
            if (typeof rows !== 'undefined' && rows.length > 0){
                var track = rows[0].filename;
                music_playback_handler.startTrackPlayback(res, track);
            } else {
        }
    );
};
fetchMusicData = function(req, res) {
    var count = 0;
	var dataType = 'music';
    metafetcher.fetch(req, res, dataType, function(type){
        if(type === dataType){
			getAlbums(function(rows){

				var albums = [];
				count = rows.length;
				rows.forEach(function(item, value){
					if(item !== null && item !== undefined){
						var album           = item.album
							, artist        = item.artist
							, year          = item.year
							, cover         = item.cover;
						getTracks(album, artist, year, cover, function(completeAlbum){
							count--;
							if(count == 0 ){
							}
						});
					}
				});
			});
		}
	});
}
