(function (App) {
    var torrentHealth = require('torrent-health');
    var _this, bookmarked;
    var ShowDetail = Backbone.Marionette.ItemView.extend({
        events: {
            'click #watch-now': 'startStreaming',
        },
        toggleFavorite: function (e) {
            if (e.type) {
                e.preventDefault();
            }
            var that = this;
            if (bookmarked !== true) {
                bookmarked = true;
                    .then(function (data) {
                            data.provider = that.model.get('provider');
                            Database.addTVShow(data)
                                .then(function (idata) {
                                    return Database.addBookmark(that.model.get('imdb_id'), 'tvshow');
                                })
                        });
            } else {
                bookmarked = false;
            }
        },
        initialize: function () {
            _this = this;
        },
        onShow: function () {
            bookmarked = App.userBookmarks.indexOf(this.model.get('imdb_id')) !== -1;
        },
        openMagnet: function (e) {
            var torrentUrl = $('.startStreaming').attr('data-torrent');
            if (e.button === 2) { //if right click on magnet link
                var clipboard = gui.Clipboard.get();
                clipboard.set(torrentUrl, 'text'); //copy link to clipboard
            } else {
        },
        switchRating: function () {
            if ($('.number-container-tv').hasClass('hidden')) {
                $('.star-container-tv').addClass('hidden');
            } else {
        },
        toggleWatched: function (e) {
            setTimeout(function () {
                var value = {
                    tvdb_id: _this.model.get('tvdb_id'),
                    imdb_id: _this.model.get('imdb_id'),
                    episode_id: $('#watch-now').attr('data-episodeid'),
                    season: edata[1],
                    episode: edata[2],
                    from_browser: true
                };
            }, 100);
        },
        isShowWatched: function () {
            var episodes = this.model.get('episodes');
            episodes.forEach(function (episode, index, array) {
                var value = {
                    tvdb_id: tvdb_id,
                    imdb_id: imdb_id,
                    season: episode.season,
                    episode: episode.episode,
                    from_browser: true
                };
            });
        },
        markShowAsWatched: function () {
            episodes.forEach(function (episode, index, array) {
            });
        },

        markWatched: function (value, state) {
            state = (state === undefined) ? true : state;
            if (value.tvdb_id === _this.model.get('tvdb_id')) {
                $('#watched-' + value.season + '-' + value.episode).toggleClass('true', state);
            } else {
            }
        },
        startStreaming: function (e) {
            var episode_id = $(e.currentTarget).attr('data-episodeid');
            var torrentStart = new Backbone.Model({
                episode_id: episode_id,
            });
        },
        getTorrentHealth: function (e) {
            var torrent = $('.startStreaming').attr('data-torrent');
            if (torrent.substring(0, 8) === 'magnet:?') {
                torrent = torrent.split('&tr')[0] + '&tr=udp://tracker.openbittorrent.com:80/announce' + '&tr=udp://open.demonii.com:1337/announce' + '&tr=udp://tracker.coppersurfer.tk:6969';
                torrentHealth(torrent).then(function (res) {
                });
            }
        },
    });
})(window.App);
