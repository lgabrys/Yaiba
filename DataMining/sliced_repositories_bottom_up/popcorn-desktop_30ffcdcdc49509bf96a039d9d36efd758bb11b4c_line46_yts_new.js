var url = 'http://yts.re/api/list.json?sort=seeds&limit=50';
var Yts = Backbone.Collection.extend({
    url: url,
    model: App.Model.Movie,

    initialize: function(models, options) {
        if (options.keywords) {
            this.url += '&keywords=' + options.keywords;
        }
        if (options.genre) {
            this.url += '&genre=' + options.genre;
        }

        if (options.page && options.page.match(/\d+/)) {
            this.url += '&set=' + options.page;
        }
    },
    parse: function (data) {
            memory = {};
        if (data.error || typeof data.MovieList === 'undefined') {
        }

        data.MovieList.forEach(function (movie) {
            var torrents = {};
            torrents[movie.Quality] = movie.TorrentUrl;

            // Temporary object
            var movieModel = {
                imdb:       movie.ImdbCode.replace('tt', ''),
                title:      movie.MovieTitleClean,
                year:       movie.MovieYear,
                runtime:    0,
                synopsis:   "",
                voteAverage:parseInt(movie.MovieRating, 10),

                image:      movie.CoverImage,
                bigImage:   movie.CoverImage.replace(/_med\./, '_large.'),
                backdrop:   "",

                quality:    movie.Quality,
                torrent:    movie.TorrentUrl,
                torrents:   torrents,
                videos:     {},
                subtitles:  {},
                seeders:    movie.TorrentSeeds,
                leechers:   movie.TorrentPeers
            };
        });
    }
});
