
var trakt = require('./js/frontend/providers/trakttv')
  , async = require('async');

var currentRequest = null;
var Yts = Backbone.Collection.extend({
    initialize: function(models, options) {
        if (options.keywords) {
            this.apiUrl += '&keywords=' + options.keywords;
        }
        if (options.genre) {
            if (options.genre == 'date') {
              this.apiUrl += '&genre=all&sort=date';
            } else {
              this.apiUrl += '&genre=' + options.genre;
            }
        }

        if (options.page && options.page.match(/\d+/)) {
            this.apiUrl += '&set=' + options.page;
        }
    },
    addMovie: function(model) {
        var stored = _.find(this.movies, function(movie) { movie.imdb == model.imdb });
        if (typeof stored === 'undefined') {
            stored = model;
        }
        if (stored.quality !== model.quality && model.quality === '720p') {
            stored.torrent = model.torrent;
            stored.quality = '720p';
        }
        stored.torrents[model.quality] = model.torrent;
        if (this.movies.indexOf(stored) === -1) {
        }
    },
    fetch: function() {
        var thisRequest = currentRequest = request(this.apiUrl, {json: true}, function(err, res, ytsData) {
            async.filter(
              function(imdbCodes) {
                var traktMovieCollection = new trakt.MovieCollection(imdbCodes);
                traktMovieCollection.getSummaries(function(trakData) {
                    ytsData.MovieList.forEach(function (movie) {
                        var traktInfo = _.find(trakData, function(trakMovie) { return trakMovie.imdb_id == movie.ImdbCode });
                        var torrents = {};
                        torrents[movie.Quality] = movie.TorrentUrl;
                        var movieModel = {
                            imdb:       movie.ImdbCode.replace('tt', ''),
                            title:      movie.MovieTitleClean.replace(/\([^)]*\)|1080p|DIRECTORS CUT|EXTENDED|UNRATED|3D|[()]/g, ''),
                            year:       movie.MovieYear,
                            runtime:    0,
                            synopsis:   '',
                            voteAverage:parseFloat(movie.MovieRating),

                            image:      movie.CoverImage.replace(/_med\./, '_large.'),
                            bigImage:   movie.CoverImage.replace(/_med\./, '_large.'),
                            backdrop:   '',

                            quality:    movie.Quality,
                            torrent:    movie.TorrentUrl,
                            torrents:   torrents,
                            videos:     {},
                            subtitles:  {},
                            seeders:    movie.TorrentSeeds,
                            leechers:   movie.TorrentPeers,

                            // YTS do not provide metadata and subtitle
                            hasSubtitle:false
                        };
                    });
                })
            })
        })
    }
});
