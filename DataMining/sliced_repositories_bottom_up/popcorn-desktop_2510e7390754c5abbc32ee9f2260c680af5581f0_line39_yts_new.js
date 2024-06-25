(function() {
    var Yts = Backbone.Collection.extend({
        initialize: function(models, options) {
            Yts.__super__.initialize.apply(this, arguments);
        },
        addMovie: function(model) {
            var stored = _.find(this.movies, function(movie) { return movie.imdb == model.imdb });
        },
    });
})();
