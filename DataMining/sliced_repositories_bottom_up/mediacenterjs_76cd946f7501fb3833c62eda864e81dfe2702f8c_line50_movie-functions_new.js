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
    , app_cache_handler = require('../../lib/handlers/app-cache-handler')
    , colors = require('colors')
    , metafetcher = require('../movies/movie-metadata.js')
    , playback_handler = require('../../lib/handlers/playback')
    , dbSchema = require('../../lib/utils/database-schema')
    , Movie = dbSchema.Movie
    , ProgressionMarker = dbSchema.ProgressionMarker;


exports.loadItems = function (req, res, serveToFrontEnd) {
    function getMovies(nomoviesCallback) {
        Movie.findAll()
        .error(function (err) {
            res.status(500).send();
        })
        .success(function (movies) {
            if (movies === null || movies.length === 0) {
            } else {
                if (serveToFrontEnd === true) {
                    res.json(movies);
                }
            }
        });
    }
    getMovies(function () {
        metafetcher.loadData(function () {
            getMovies(function () {
                res.status(500).send("no movies");
            });
        });
    });
};
