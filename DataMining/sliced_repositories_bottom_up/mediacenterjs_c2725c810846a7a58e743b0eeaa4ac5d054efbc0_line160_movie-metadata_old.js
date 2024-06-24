var moviedb = require('moviedb')('7983694ec277523c31ff1212e35e5fa3'),
    fs = require('fs'),
    configuration_handler = require('../../lib/handlers/configuration-handler'),
    config = configuration_handler.initializeConfiguration(),
    movie_title_cleaner = require('../../lib/utils/title-cleaner'),
var nrScanned = 0;
var totalFiles = 0;
var database = require('../../lib/utils/database-connection');
var db = database.db;
var walk = function(dir, done) {
    fs.readdir(dir, function(err, list) {
        var i = 0;
        (function next() {
            var file = list[i++];
            file = dir + '/' + file;
        })();
    });
};
var setupParse = function(req, res, serveToFrontEnd, results) {
    if (results && results.length > 0) {
        var file = results.pop();
    }
    if (!results) {
    }
};
var doParse = function(req, res, file, serveToFrontEnd, callback) {
    var incommingTitle      = file.split('/').pop()
        , originalTitle     = incommingTitle
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
            if(nrScanned === totalFiles){
                if(serveToFrontEnd === true){
                    getMovies(req, res);
                }
            }
        });
    });
};
