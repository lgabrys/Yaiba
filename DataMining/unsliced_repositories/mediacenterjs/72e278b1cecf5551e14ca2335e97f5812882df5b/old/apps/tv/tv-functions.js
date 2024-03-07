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
var fs = require('fs.extra')
    , file_utils = require('../../lib/utils/file-utils')
    , colors = require('colors')
    , path = require('path')
    , metafetcher = require('../tv/tv-metadata')
    , config = require('../../lib/handlers/configuration-handler').getConfiguration()
    , playback_handler = require('../../lib/handlers/playback');

    var database = require('../../lib/utils/database-connection');
    var db = database.db;

var getNewFiles = false;

//Create tables
db.query("CREATE TABLE IF NOT EXISTS tvshows (title VARCHAR PRIMARY KEY,banner VARCHAR, genre VARCHAR, certification VARCHAR)");
db.query("CREATE TABLE IF NOT EXISTS tvepisodes (localName TEXT PRIMARY KEY,title VARCHAR, season INTEGER, epsiode INTEGER)");

exports.loadItems = function (req, res, serveToFrontEnd){
    if(serveToFrontEnd == false){
        fetchTVData(req, res, serveToFrontEnd);
    } else if(serveToFrontEnd === undefined || serveToFrontEnd === null){
        var serveToFrontEnd = true;
        getTvshows(req, res, serveToFrontEnd);
    }  else{
        getTvshows(req, res, serveToFrontEnd);
    }
};

exports.edit = function(req, res, data){
    db.query('UPDATE tvshows SET title=$newTitle,banner=$newBanner WHERE title=$currentTitle; ', {
        newTitle      : data.newTitle,
        newBanner     : data.newBanner,
        currentTitle  : data.currentTitle
    },
    function (err, rows) {
        if(err){
            console.log('DB error', err);
        } else {
            res.json('done');
        }
    });
}

exports.playFile = function (req, res, platform, tvShowRequest){
    file_utils.getLocalFile(config.tvpath, tvShowRequest, function(err, file) {
        if (err){
            console.log(err .red);
        }
        if (file) {
            var tvShowUrl = file.href;

            var subtitleUrl = tvShowUrl;
            subtitleUrl     = subtitleUrl.split(".");
            subtitleUrl     = subtitleUrl[0]+".srt";

            var subtitleTitle   = tvShowRequest;
            subtitleTitle       = subtitleTitle.split(".");
            subtitleTitle       = subtitleTitle[0]+".srt";

            var type = "tv";
            playback_handler.startPlayback(res, platform, tvShowUrl, tvShowRequest, subtitleUrl, subtitleTitle, type);

        } else {
            console.log("File " + tvShowRequest + " could not be found!" .red);
        }
    });
};

exports.progress = function (req, res){
    db.query("CREATE TABLE IF NOT EXISTS progressionmarker (title TEXT PRIMARY KEY, progression INTEGER, transcodingstatus TEXT)");

    var incommingData   = req.body
    , tvShowTitle       = incommingData.title
    , progression       = incommingData.progression
    , transcodingstatus = 'pending';

    if(tvShowTitle !== undefined && progression !== undefined){
        var progressionData = [tvShowTitle, progression, transcodingstatus];
        db.query('INSERT OR REPLACE INTO progressionmarker VALUES(?,?,?)',progressionData );
    }
};


/** Private functions **/

fetchTVData = function(req, res, serveToFrontEnd) {
    metafetcher.loadData(req, res, serveToFrontEnd);
}

getTvshows  = function(req, res, serveToFrontEnd){
    var itemsDone   = 0;
    var ShowList    = [];

    db.query('SELECT * FROM tvshows ORDER BY title asc',{
        title             : String,
        banner            : String,
        genre             : String,
        certification     : String
    }, function(err, rows) {
        if(err){
            db.query("CREATE TABLE IF NOT EXISTS tvshows (title VARCHAR PRIMARY KEY,banner VARCHAR, genre VARCHAR, certification VARCHAR)");
            console.log("DB error",err);
            serveToFrontEnd = true;
            fetchTVData(req, res, serveToFrontEnd);
        } else if (rows !== null && rows !== undefined && rows.length > 0) {
            var count = rows.length;
            console.log('Found '+count+' shows, getting additional data...');

            rows.forEach(function(item, value){
                var showTitle       = item.title
                , showBanner        = item.banner
                , showGenre         = item.genre
                , showCertification = item.certification;

                getEpisodes(showTitle, showBanner, showGenre, showCertification, function(availableEpisodes){
                    itemsDone++;
                    if(availableEpisodes !== 'none' && availableEpisodes !== null){
                        ShowList.push(availableEpisodes);
                    } else {
                        console.log('Error retrieving episodes. Available episodes:', availableEpisodes);
                    }
                    if (count === itemsDone) {
                        res.json(ShowList);
                    }
                });
            });
        } else {
            fetchTVData(req, res, serveToFrontEnd);
        }
    });
}

getEpisodes = function(showTitle, showBanner, showGenre, showCertification, callback){
    db.query('SELECT * FROM tvepisodes WHERE title = $title ORDER BY season asc', { title:showTitle }, {
        localName   : String,
        title       : String,
        season      : Number,
        episode     : Number
    },
    function(err, rows) {
        if(err){
            console.log('DB error getting episodes', err);
            callback('none');
        }
        if (typeof rows !== 'undefined' && rows.length > 0){
        var episodes = rows;
        var availableEpisodes = {
            "title"         : showTitle,
            "banner"        : showBanner,
            "genre"         : showGenre,
            "certification" : showCertification,
            "episodes"      : episodes
        }
        callback(availableEpisodes);
        } else {
            callback('none');
        }
    });
}
