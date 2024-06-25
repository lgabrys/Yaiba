(function (App) {
    var Watchlist = function () {};
    Watchlist.prototype.constructor = Watchlist;
    Watchlist.prototype.config = {
    };
    var rearrange = function (items) {
            arrange = [],
            arranged;
        })).then(function () {
            arranged = arrange.sort(function(a, b){
                if(a.episode_aired > b.episode_aired) {
                    return -1;
                }
                if(a.episode_aired < b.episode_aired) {
                    return 1;
                }
                return 0;
            });
        });
    };
    var format = function (items) {
        console.log('format'); //debug
        return Promise.all(items.map(function (item) {
            if (item.next_episode) {
                } else {
                    var show = item.show;
                    show.type = 'show';
                    show.episode = item.next_episode.number;
                    show.season = item.next_episode.season;
                    show.episode_title = item.next_episode.title;
                    show.episode_id = item.next_episode.ids.tvdb;
                    show.episode_aired = item.next_episode.first_aired;
                    show.imdb_id = item.show.ids.imdb;
                    show.tvdb_id = item.show.ids.tvdb;
                    show.image = item.show.images.poster.thumb;
                    show.rating = item.show.rating;
                    show.title = item.show.title;
                    show.trailer = item.show.trailer;
                }
            } else {
        })).then(function () {
    };
    var load = function () {
        return trakt.ondeck.getAll().then(function (tv) {
            localStorage.watchlist_update_shows = JSON.stringify(tv);
        }).then(function (movies) {
            localStorage.watchlist_update_movies = JSON.stringify(movies);
        }).then(rearrange).then(function (items) {
            localStorage.watchlist_fetched_time = Date.now();
            localStorage.watchlist_cached = JSON.stringify(items);
        });
    };
    var update = function (id) {
        var update_data = JSON.parse(localStorage.watchlist_update_shows);
        return trakt.ondeck.updateOne(update_data, id).then(function (tv) {
            localStorage.watchlist_update_shows = JSON.stringify(tv);
        }).then(rearrange).then(function (items) {
            localStorage.watchlist_fetched_time = Date.now();
            localStorage.watchlist_cached = JSON.stringify(items);
        });
    };
    Watchlist.prototype.extractIds = function (items) {
    };
    Watchlist.prototype.detail = function (torrent_id, old_data, callback) {
    };
    Watchlist.prototype.fetch = function (filters) {
        return new Promise(function (resolve, reject) {
            } else {
                if (!localStorage.watchlist_cached || localStorage.watchlist_fetched_time + 14400000 < Date.now()) {
                } else {
            }
        });
    };
})(window.App);
