(function() {
    var trakt = require('./js/frontend/providers/trakttv');
    var async = require('async');
    var request = require('request');
    // Hack to keep to cancel the request in case of new request
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
            Yts.__super__.initialize.apply(this, arguments);
        },


        fetch: function() {
            var thisRequest = currentRequest = request(this.apiUrl, {json: true}, function(err, res, ytsData) {

                var imdbIds = _.pluck(ytsData.MovieList, 'ImdbCode');
                App.Providers.YSubs.fetch(_.map(imdbIds, function(id){return id.replace('tt','');}))
                .then(function(subtitles) {
                    async.filter(
                      function(imdbCodes) {
                        var traktMovieCollection = new trakt.MovieCollection(imdbCodes);
                        traktMovieCollection.getSummaries(function(trakData) {
                            ytsData.MovieList.forEach(function (movie) {
                                var traktInfo = _.find(trakData, function(trakMovie) { return trakMovie.imdb_id == movie.ImdbCode });
                                var torrents = {};
                                torrents[movie.Quality] = movie.TorrentUrl;
                                var imdbId = movie.ImdbCode.replace('tt', '');
                                var movieModel = {
                                    imdb:       imdbId,
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
                                    subtitles:  subtitles[imdbId],
                                    seeders:    movie.TorrentSeeds,
                                    leechers:   movie.TorrentPeers,

                                    // YTS do not provide metadata and subtitle
                                    hasSubtitle:true
                                };
                                if(traktInfo) {
                                    movieModel.image = trakt.resizeImage(traktInfo.images.poster, '138');
                                    movieModel.bigImage = trakt.resizeImage(traktInfo.images.poster, '300');
                                    movieModel.backdrop = trakt.resizeImage(traktInfo.images.fanart, '940');
                                } else {
                            });
                        })
                    })
                });
            })
        }
    });
})();
