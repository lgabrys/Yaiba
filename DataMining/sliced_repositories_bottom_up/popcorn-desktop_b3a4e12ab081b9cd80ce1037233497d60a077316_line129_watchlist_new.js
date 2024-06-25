(function (App) {
    var Q = require('q');
    var Eztv = App.Providers.get('Eztv');
    var queryTorrents = function (filters) {
        var deferred = Q.defer();
            .then(function (doc) {
                if (doc) {
                    if (Math.abs(now.diff(d, 'days')) >= 1) {
                        App.db.writeSetting({
                            })
                    } else {
                } else {
                        .then(function () {
                        });
                }
            });
        function fetchWatchlist(update) {
                .then(function (doc) {
                    if (doc && !update) {
                        deferred.resolve(doc.value || []);
                    } else {
                });
        }
    };
    var formatForPopcorn = function (items) {
        items.forEach(function (show) {
            Database.getTVShowByImdb(show.show_id)
                .then(function (data) {
                    if (data != null) {
                        data.type = 'show';
                        data.image = data.images.poster;
                        data.imdb = data.imdb_id;
                        data.next_episode = show.next_episode;
                        if (typeof (data.provider) === 'undefined') {
                            data.provider = 'Eztv';
                        }
                    } else {
                        data = Eztv.detail(show.show_id, show, false)
                    }
                });
        });
    };
})(window.App);
