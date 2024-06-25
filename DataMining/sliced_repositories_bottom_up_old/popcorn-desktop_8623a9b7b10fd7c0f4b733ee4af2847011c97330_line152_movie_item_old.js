(function(App) {
    var MovieItem = Backbone.Marionette.ItemView.extend({
        onShow: function() {
            var watched = App.watchedMovies.indexOf(this.model.get('imdb')) !== -1;
            this.model.set('watched', watched);
        },
        onRender: function() {
            var watched = this.model.get('watched');
            } else {
            }
            if (watched) {
            } else {
        },
        toggleFavorite: function(e) {
            var that = this;
            } else {
                var movie = {
                    imdb: this.model.get('imdb'),
                    image: this.model.get('image'),
                    torrents: this.model.get('torrents'),
                    title: this.model.get('title'),
                    synopsis: this.model.get('synopsis'),
                    runtime: this.model.get('runtime'),
                    year: this.model.get('year'),
                    health: this.model.get('health'),
                    subtitle: this.model.get('subtitle'),
                    backdrop: this.model.get('backdrop'),
                    rating: this.model.get('rating'),
                    trailer: this.model.get('trailer'),
                };
                Database.addMovie(movie, function(error, result) {
                    Database.addBookmark(that.model.get('imdb'), 'movie', function(err, data) {
                        console.log('Bookmark added');
                        that.model.set('bookmarked', true);

                    });
                });
            }
        }
    });
})(window.App);
