(function(App) {
    "use strict";

    var Q = require('q');

    var MovieCollection = Backbone.Collection.extend({

        initialize: function() {
            this.providers = {
                torrent: new (App.Config.getProvider('torrent'))(),
                subtitle: new (App.Config.getProvider('subtitle'))(),
                metadata: new (App.Config.getProvider('metadata'))()
            };
        },

        // TODO: Consolidate data
        fetch: function(filter) {
            var subtitle = this.providers.subtitle;
            var metadata = this.providers.metadata;
            var torrent = this.providers.torrent;
            var torrentPromise = torrent.fetch(filter);
            var idsPromise = torrentPromise.then(_.bind(torrent.extractIds, torrent));
            var subtitlePromise = idsPromise.then(_.bind(subtitle.fetch, subtitle));
            var metadataPromise = idsPromise.then(_.bind(metadata.fetch, metadata));

            return Q.all([torrentPromise, subtitlePromise, metadataPromise])
                .spread(function(movies, subtitles, metadatas) {
                    _.each(movies, function(movie){
                        var id = movie.imdb;
                        var info = metadatas[id];
                        movie.subtitle = subtitles[id];
                        _.extend(movie, _.pick(info, [
                            'image','bigImage','backdrop',
                            'synopsis','genres','certification','runtime',
                            'tagline','title','trailer','year'
                        ]));
                    });

                    // TODO: Do something with movies
                }, function(err) {
                    console.error(err, err.stack);
                });
        }
    });

    App.Model.MovieCollection = MovieCollection;
})(window.App);