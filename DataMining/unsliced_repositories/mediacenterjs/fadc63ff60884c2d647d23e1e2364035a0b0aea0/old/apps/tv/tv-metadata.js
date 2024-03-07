
/*
    MediaCenterJS - A NodeJS based mediacenter solution

    Copyright (C) 2014 - Jan Smolders

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/* Global Imports */
var dblite = require('dblite'),
    fs = require('graceful-fs'),
    path = require('path'),
    os = require('os'),
    file_utils = require('../../lib/utils/file-utils'),
    ajax_utils = require('../../lib/utils/ajax-utils'),
    app_cache_handler = require('../../lib/handlers/app-cache-handler'),
    configuration_handler = require('../../lib/handlers/configuration-handler'),
    Trakt = require('trakt'),
    tv_title_cleaner = require('../../lib/utils/title-cleaner'),
    io = require('../../lib/utils/setup-socket').io;

var config = configuration_handler.initializeConfiguration();

/* Constants */

var SUPPORTED_FILETYPES = new RegExp("(avi|mkv|mpeg|mov|mp4|wmv)$","g");  //Pipe seperated
var start = new Date();
var nrScanned = 0;
var totalFiles = 0;
var noResult = {
    "result":"none"
};

// Init Database

/* Public Methods */

/**
 * Fetches the Metadata for the specified Album from discogs.org.
 * @param albumTitle         The Title of the Album
 * @param callback           The Callback
 */

/* walk over a directory recursivly */
var dir = path.resolve(config.tvpath);
var walk = function(dir, done) {
    var results = [];
    fs.readdir(dir, function(err, list) {
        if (err)
            return done(err);
        var i = 0;
        (function next() {
            var file = list[i++];
            if (!file)
                return done(null, results);
            file = dir + '/' + file;
            fs.stat(file, function(err, stat) {
                if (stat && stat.isDirectory()) {
                    walk(file, function(err, res) {
                        results = results.concat(res);
                        next();
                    });
                } else {
                    var ext = file.split(".");
                    ext = ext[ext.length - 1];
                    if (ext.match(SUPPORTED_FILETYPES)) {
                        results.push(file);
                    }
                    next();
                }
            });
        })();
    });
};

var setupParse = function(req, res, serveToFrontEnd, results) {
    if (results && results.length > 0) {
        var file = results.pop();
        doParse(req, res, file, serveToFrontEnd, function() {
            setupParse(req, res, serveToFrontEnd, results);
        });
    }
    if (!results) {
        console.log('no results!');
        res.json(noResult);
    }
};


var doParse = function(req, res, file, serveToFrontEnd, callback) {
    var originalTitle           = file.split('/').pop()
    , episodeInfo               = tv_title_cleaner.cleanupTitle(originalTitle)
    , episodeReturnedTitle      = episodeInfo.title
    , episodeStripped           = episodeReturnedTitle.replace(/.(avi|mkv|mpeg|mpg|mov|mp4|wmv)$/,"")
    , episodeTitle              = episodeStripped.trimRight();

    getDataForNewShow(originalTitle, episodeTitle, function(){
        nrScanned++;

        var perc = parseInt((nrScanned / totalFiles) * 100);
        var increment = new Date(), difference = increment - start;
        if (perc > 0) {
            var total = (difference / perc) * 100, eta = total - difference;
            io.sockets.emit('progress',{msg:perc});
            console.log(perc+'% done.');
        }

        if(nrScanned === totalFiles){
            if(serveToFrontEnd === true){
                io.sockets.emit('serverStatus',{msg:'Processing data...'});
                Show.findAll({include:[Episode]})
                .success(function (shows) {
                    res.json(shows);
                })
                .error(function (err) {
                    res.status(500).send();
                });
            }
        }

        callback();
    });
};


/**
 * Fetches the (new) show Metadata not stored in db based on episode
 * @param originalTitle      Original episode filename
 * @param episodeTitle       Cleaned up name of episode
 */
getDataForNewShow = function(originalTitle, episodeTitle,callback){

    var episodeSeason       = '0'
        , season            = ''
        , number            = ''
        , title             = ''
        , trimmedTitle      = ''
        , episodeNumber     = '0';

    if(config.tvFormat === 's00e00' || config.tvFormat === undefined){
        var showTitle               = episodeTitle.replace(/[sS]([0-9]{1,2})[eE]([0-9]{1,2})/, '')
        , episodeSeasonMatch        = episodeTitle.match(/[sS]([0-9]{1,2})/)
        , episodeNumberMatch        = episodeTitle.match(/[eE]([0-9]{1,2})/);

        if(episodeSeasonMatch){
            episodeSeason       = episodeSeasonMatch[0].replace(/[sS]/,"");
        }
        if(episodeNumberMatch){
            episodeNumber       = episodeNumberMatch[0].replace(/[eE]/,"");
        }
    } else if(config.tvFormat === '0x00'){
        var showTitle            = episodeTitle.replace(/([0-9]{1,2})+?(x)+?([0-9]{1,2})/, '')
        , episodeNumberMatch     = episodeTitle.match(/(x)+?([0-9]{1,2})/)

        episodeSeason          = episodeTitle.match(/(\d{1,2})+?(?=x)/)

        if(episodeNumberMatch){
            episodeNumber    = episodeNumberMatch[0].replace("x","");
        }
    }

    var episodeData = {
        "showTitle"         : showTitle.toLowerCase(),
        "episodeSeason"     : episodeSeason,
        "episodeNumber"     : episodeNumber
    }

    season          = episodeData.episodeSeason;
    number          = episodeData.episodeNumber;
    title           = episodeData.showTitle;
    trimmedTitle    = title.trim();

    // Store episode data in db and do lookup again
    Episode.create({
        fileName: originalTitle,
        name: trimmedTitle,
        season: season,
        episode: number
    })
    .success(function(episode) {
        var genre           = "No data"
        , certification     = "No data"
        , showTitle         = 'unknown show'
        , bannerImage       = '/tv/css/img/nodata.jpg'

        getMetadataFromTrakt(trimmedTitle, function(err, result){
            if (err) {
                console.error('Error returning Trakt data', err);
            } else {
                var traktResult = result;
                bannerImage     = traktResult.images.banner;
                showTitle       = traktResult.title;

                if(traktResult !== null){
                    if(traktResult.genres !== undefined){
                        genre = traktResult.genres;
                    }
                    if (traktResult.certification !== undefined) {
                        certification = traktResult.certification;
                    }
                    if(traktResult.title !== undefined){
                        var showTitleResult = traktResult.title;
                    }
                }

                showTitle = showTitleResult.toLowerCase();
                Show.create({
                    name: showTitle,
                    posterURL: bannerImage,
                    genre: genre.join(','),
                    certification: certification
                })
                .success(function (show) {
                    show.addEpisode(episode)
                    .success(function() {
                        callback();
                    });
                });
            }
        });
    });
}


getMetadataFromTrakt = function(tvShow, callback) {
    var options = { query: tvShow }
    , trakt = new Trakt({username: 'mediacenterjs', password: 'mediacenterjs'});

    trakt.request('search', 'shows', options, function(err, result) {
        if (err) {
            console.log('error retrieving tvshow info', err .red);
            callback(err, null);
        } else {
            var tvSearchResult = result[0];

            if (tvSearchResult !== undefined && tvSearchResult !== '' && tvSearchResult !== null) {
                callback(err, tvSearchResult);
            }
        }
    });
};


/* Lookup */
exports.loadData = function(req, res, serveToFrontEnd) {
    nrScanned = 0;
    walk(dir,  function(err, results) {
        totalFiles = (results) ? results.length : 0;
        setupParse(req, res, serveToFrontEnd, results);
    });
}
