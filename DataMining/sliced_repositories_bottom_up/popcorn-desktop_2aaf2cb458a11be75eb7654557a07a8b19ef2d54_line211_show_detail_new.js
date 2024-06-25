(function(App) {
    var _this, bookmarked;
    var ShowDetail = Backbone.Marionette.ItemView.extend({
        toggleFavorite: function(e) {
            if (e.type) {
                e.preventDefault();
            }
            var that = this;
            if (bookmarked !== true) {
                bookmarked = true;
                var data = provider.detail(this.model.get('imdb_id'),
                                           function(err, data) {
                    if (!err) {
                        data.provider = that.model.get('provider');
                        Database.addTVShow(data, function(err, idata) {
                        });
                    } else {
                    }
                });
            } else {
                bookmarked = false;
            }
        },
        initialize: function() {
            _this = this;
        },
        initKeyboardShortcuts: function() {
            Mousetrap.bind(['enter', 'space'], _this.playEpisode);
        },
        onShow: function() {
            bookmarked = App.userBookmarks.indexOf(this.model.get('imdb_id')) !== -1;
            var episodesSeen = [];
            Database.getEpisodesWatched(this.model.get('tvdb_id'), function(err, data) {
                var season = 1;
                var episode = 1;
                if (episodesSeen.length > 0) {
                    //get all episode
                    var episodes = [];
                    _.each(_this.model.get('episodes'),
                        function(value, currentepisode) {
                            episodes.push(parseInt(value.season) * 100 +
                                parseInt(value.episode));
                        }
                    );
                    episodesSeen.sort();
                    episodes.sort();
                    var first = episodes[0];
                    var last = episodes[episodes.length - 1];
                    var unseen = episodes.filter(function(item) {
                        return episodesSeen.indexOf(item) === -1;
                    });
                    //if all episode seend back to first
                    //it will be the only one
                    unseen.push(first);
                    episode = unseen[0] % 100;
                    season = (unseen[0] - episode) / 100;
                }
            });
        },
    });
})(window.App);
