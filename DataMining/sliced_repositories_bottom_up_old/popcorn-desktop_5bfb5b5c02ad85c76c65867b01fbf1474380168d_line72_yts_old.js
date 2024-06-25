

var trakt = require('./js/frontend/providers/trakttv')

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
        var collection = this;
        var thisRequest = currentRequest = request(this.apiUrl, {json: true}, function(err, res, ytsData) {
            if (ytsData.error || typeof ytsData.MovieList === 'undefined') {
                collection.set(movies);
            }
        })
    }
});
