var moviedb = require('moviedb')('7983694ec277523c31ff1212e35e5fa3'),
    fs = require('fs'),
    os = require('os'),
    path = require('path'),
    Trakt = require('trakt'),
    app_cache_handler = require('../../lib/handlers/app-cache-handler'),
    configuration_handler = require('../../lib/handlers/configuration-handler'),
    config = configuration_handler.initializeConfiguration(),
    file_utils = require('../../lib/utils/file-utils'),
    movie_title_cleaner = require('../../lib/utils/title-cleaner'),
    socket = require('../../lib/utils/setup-socket'),
    io = socket.io;
var start = new Date();
var nrScanned = 0;
var totalFiles = 0;
var database = require('../../lib/utils/database-connection');
var db = database.db;
var doParse = function(req, res, file, serveToFrontEnd, callback) {
    var incommingTitle      = file.split('/').pop()
        , movieInfo         = movie_title_cleaner.cleanupTitle(incommingTitle)
        , newCleanTitle     = movieInfo.title
        , NewMovieTitle     = newCleanTitle.replace(/(avi|mkv|mpeg|mpg|mov|mp4|wmv)$/,"")
        , movieTitle        = NewMovieTitle.trimRight();
    getMetadataFromTheMovieDB(movieTitle, movieInfo.year, function(result) {
        if(result !== null){
            movieTitle      = result.title
            var metadata = [
            ];
        }
        storeMetadataInDatabase(metadata, function(){
            nrScanned++;
            var perc = parseInt((nrScanned / totalFiles) * 100);
            var increment = new Date(), difference = increment - start;
            if (perc > 0) {
                var total = (difference / perc) * 100, eta = total - difference;
                io.sockets.emit('progress',{msg:perc});
            }
            if(nrScanned === totalFiles){
                if(serveToFrontEnd === true){
                    io.sockets.emit('serverStatus',{msg:'Processing data...'});
                }
            }
        });
    });
};
