App.View.MovieList = Backbone.View.extend({
    tagName: 'ul',

    className: 'movie-list',
    constructor: function (options) {
        this.configure(options || {});
    },

    configure: function (options) {
        if (this.options) {
            options = _.extend({}, _.result(this, 'options'), options);
        }
        this.options = options;
    },

    initialize: function (options) {

        this.collection = App.getTorrentsCollection(options);
        this.listenTo(this.collection, 'sync', this.render);
    },


    render: function () {
        if( window.initialLoading ) {
        }
        var movieList = this;
        $.each(this.collection.models, function () {
            // Only append not yet appended elements
            var $movie = this.view.$el;
            var $currentEl = movieList.$el.find('#movie-'+ this.get('imdb') );
            if ( ! $currentEl.length ) {
                $currentEl = $movie;
            }
            // Check for IMDB id and also image loaded (required for view)
            if (! $movie.hasClass('fullyLoaded')) {
            }
        });
    }
});
