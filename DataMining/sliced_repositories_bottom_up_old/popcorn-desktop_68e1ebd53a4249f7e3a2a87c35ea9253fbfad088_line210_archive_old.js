(function(App) {
	'use strict';
	var querystring = require('querystring');
	var request = require('request');
	var Q = require('q');

	var queryTorrents = function(filters) {
                var query = 'collection:moviesandfilms'; // OR mediatype:movies)';
                query    += ' AND -mediatype:collection';
                query    += ' AND format:"Archive BitTorrent"';
                query    += ' AND year'; // this is actually: has year
//                query    += ' AND avg_rating'; // this is actually: has year
		var params = {
                        output: 'json',
		        rows : '50',
                        q: query
                };
		if (filters.keywords) {
			params.keywords = filters.keywords.replace(/\s/g, '% ');
		}
		if (filters.genre) {
			params.genre = filters.genre;
		}
		if(filters.order) {
		}
		if (filters.page) {
			params.page = filters.page;
		}
		if (Settings.movies_quality !== 'all') { //XXX(xaiki): not supported
			params.quality = Settings.movies_quality;
		}

                        .catch (function (err) {
	                        win.error('ARCHIVE.org error:', err);
                        })
        };
        var deferRequest = function (url, params, hasQuestionMark) {
                var d = Q.defer();
                if (params != undefined)  {
                        url += hasQuestionMark?'&':'?';
                        url += querystring.stringify (params);
                }
		request({url: url, json: true}, function(error, response, data) {
			if(error) {
				d.reject(error);
			} else if(!data || (data.error && data.error !== 'No movies found')) {
				var err = data? data.error: 'No data returned';
				d.reject(err);
			} else {
			}
		});
        }
        var queryDetails = function(id, movie) {
                return deferRequest (url).then (function (data) {
                })
        }
        function exctractYear (movie) {
                var metadata = movie.metadata;
                } else if (metadata.hasOwnProperty('date')) {
                        return metadata.date[0];
                } else if (metadata.hasOwnProperty('addeddate')) {
                        return metadata.addeddate[0];
                }
        }

        var formatDetails = function (movie, old) {
                if (movie.hasOwnProperty('reviews')) {
                }
		var seeds = 0; //XXX movie.TorrentSeeds;
                movie.Quality = '480p'; // XXX
		var torrents = {};
		torrents[movie.Quality] = {
			url: url + turl,
			size: torrentInfo.size,
			seed: seeds,
			peer: peers
		};
                old.torrents = torrents;
                old.health   = {}

	};
        var formatOMDbforButter = function (movie) {
		var id = movie.imdbID
                var metadata = movie.archive.metadata;
                var runtime = movie.Runtime
                var year = movie.Year;
                var rating = movie.imdbRating;
                movie.Quality = '480p'; // XXX
		return {
                        type:     'movie',
                        aid:      movie.archive.identifier,
			imdb:     id,
                        imdb_id:  id,
			title:    movie.Title,
                        genre:    movie.Genre,
                        year: 	  year,
			rating:   rating,
                        runtime:  runtime,
			image:    undefined,
                        cover:    undefined,
                        images:  {
                                poster: undefined
                        },
                        synopsis: movie.Plot,
                        subtitle: {} // TODO
	        };
	};
})(window.App);
