(function (App) {
    App.View.MovieDetail = Backbone.Marionette.ItemView.extend({
        events: {
            'click .sub-dropdown': 'toggleDropdown',
        },
        initialize: function () {
            App.vent.on('viewstack:pop', function () {
            });
        },
        onShow: function () {

            App.MovieDetailView = this;

        },
        toggleFavourite: function (e) {
            } else {
                var movie = {
                    imdb_id: this.model.get('imdb_id'),
                    image: this.model.get('image'),
                    torrents: this.model.get('torrents'),
                    title: this.model.get('title'),
                    synopsis: this.model.get('synopsis'),
                    runtime: this.model.get('runtime'),
                    year: this.model.get('year'),
                    genre: this.model.get('genre'),
                    health: this.model.get('health'),
                    subtitle: this.model.get('subtitle'),
                    backdrop: this.model.get('backdrop'),
                    rating: this.model.get('rating'),
                    trailer: this.model.get('trailer'),
                    provider: this.model.get('provider'),
                    watched: this.model.get('watched'),
                };
                    .then(function () {
                    });
            }
        },
        toggleWatched: function (e) {
            var that = this;
            if (this.model.get('watched') === true) {
                that.model.set('watched', false);
            } else {
            }
        },
        openIMDb: function () {
        },
        toggleQuality: function (e) {
            App.vent.trigger('qualitychange');
        },
    });
})(window.App);
