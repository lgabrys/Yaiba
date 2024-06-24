(function (App) {
    'use strict';

    var PopCollection = Backbone.Collection.extend({
        initialize: function (models, options) {

            options = options || {};
            options.filter = options.filter || new App.Model.Filter();
            this.filter = _.defaults(_.clone(options.filter.attributes), {
                page: 1
            });
        },
        fetch: function () {
            var self = this;

            function getDataFromProvider(torrentProvider) {
                var promises = [
                    metadata ? idsPromise.then(function (ids) {
                    }) : true
                ];

                Q.all(promises)
                    .spread(function (torrents, subtitles, metadatas) {
                        metadatas = _.map(metadatas, function (m) {
                            if (!m || !m.value) {
                            }
                            m = m.value;
                            m.id = m.ids.imdb;
                        });
                        _.each(torrents.results, function (movie) {
                            var id = movie[self.popid];
                            movie.provider = torrentProvider.name;
                            if (subtitles) {
                                movie.subtitle = subtitles[id];
                            }
                            if (metadatas) {
                                var info = _.findWhere(metadatas, {
                                });
                                if (info) {
                                    _.extend(movie, {
                                        synopsis: info.overview,
                                    });
                                    if (info.images.poster) {
                                        movie.image = info.images.poster;
                                        if (!movie.cover) {
                                            movie.cover = movie.image.full;
                                        }
                                    }
                                    if (info.images.fanart) {
                                        movie.backdrop = info.images.full;
                                    }
                                } else {
                                    win.warn('Unable to find %s on Trakt.tv', id);
                                }
                            }
                        });
                    })
            }
        },
    });
})(window.App);
