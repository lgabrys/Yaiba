    , metafetcher = require('../tv/tv-metadata')
    var database = require('../../lib/utils/database-connection');
    var db = database.db;
exports.edit = function(req, res, data){
    db.query('UPDATE tvshows SET title=$newTitle,banner=$newBanner WHERE title=$currentTitle; ', {
    function (err, rows) {
    });
}
fetchTVData = function(req, res, serveToFrontEnd) {
    metafetcher.loadData(req, res, serveToFrontEnd);
}
function getTvshows(req, res, serveToFrontEnd){
    var itemsDone   = 0;
    var ShowList    = [];
    db.query('SELECT * FROM tvshows',{
    }, function(err, rows) {
        if(err){
            serveToFrontEnd = true;
        } else if (rows !== null && rows !== undefined && rows.length > 0) {
            rows.forEach(function(item, value){
                getEpisodes(showTitle, showBanner, showGenre, showCertification, function(availableEpisodes){
                    if(availableEpisodes !== 'none'){
                        if(availableEpisodes !== null) {
                            itemsDone++;
                        }
                    } else {
                });
            });
        } else {
            fetchTVData(req, res, serveToFrontEnd);
        }
    });
}
