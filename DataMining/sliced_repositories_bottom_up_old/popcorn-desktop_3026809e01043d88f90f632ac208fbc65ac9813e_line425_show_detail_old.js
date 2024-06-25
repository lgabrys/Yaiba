(function (App) {
    var _this, bookmarked;
    var ShowDetail = Backbone.Marionette.ItemView.extend({
        events: {
            'click .close-icon': 'closeDetails',
        },
        toggleFavorite: function (e) {
            if (e.type) {
            }
            var that = this;
            if (bookmarked !== true) {
                bookmarked = true;
                    .then(function (data) {
                                .then(function (idata) {
                                    return Database.addBookmark(that.model.get('imdb_id'), 'tvshow');
                                })
                                .then(function () {
                                });
                        function (err) {
                        });
            } else {
                bookmarked = false;
            }
        },
        initialize: function () {
            _this = this;
        },
        initKeyboardShortcuts: function () {
            Mousetrap.bind(['ctrl+down', 'command+down'], _this.nextSeason);
            Mousetrap.bind('f', function () {
                $('.favourites-toggle').click();
            });
        },
        onShow: function () {
            bookmarked = App.userBookmarks.indexOf(this.model.get('imdb_id')) !== -1;
            if (bookmarked) {
            } else {
                this.ui.bookmarkIcon.removeClass('selected');
            }
            var cbackground = $('.tv-cover').attr('data-bgr');
            var coverCache = new Image();
            coverCache.src = cbackground;
            coverCache.onload = function () {
                coverCache = null;
            };
            var background = $('.tv-poster-background').attr('data-bgr');
            var bgCache = new Image();
            bgCache.src = background;
            bgCache.onload = function () {
                bgCache = null;
            };

        },
        selectNextEpisode: function () {

            var episodesSeen = [];
                .then(function (data) {
                    var episode = 1;
                    if (episodesSeen.length > 0) {
                        //get all episode
                        var episodes = [];
                        _.each(_this.model.get('episodes'),
                            function (value, currentepisode) {
                                episodes.push(parseInt(value.season) * 100 +
                                    parseInt(value.episode));
                            }
                        );
                        episodesSeen.sort(function (a, b) {
                            return a - b;
                        });
                        episodes.sort(function (a, b) {
                            return a - b;
                        });
                        var first = episodes[0];
                        var last = episodes[episodes.length - 1];
                        var unseen = episodes.filter(function (item) {
                            return episodesSeen.indexOf(item) === -1;
                        });
                        if (AdvSettings.get('tv_detail_jump_to') !== 'firstUnwatched') {
                            var lastSeen = episodesSeen[episodesSeen.length - 1];

                            if (lastSeen !== episodes[episodes.length - 1]) {
                                var idx;
                                _.find(episodes, function (data, dataIdx) {
                                    if (data === lastSeen) {
                                        idx = dataIdx;
                                        return true;
                                    }
                                });

                                var next_episode = episodes[idx + 1];
                                episode = next_episode % 100;
                                season = (next_episode - episode) / 100;
                            } else {
                                episode = lastSeen % 100;
                                season = (lastSeen - episode) / 100;
                            }
                        } else {
                            //if all episode seend back to first
                            //it will be the only one
                            unseen.push(first);
                            episode = unseen[0] % 100;
                            season = (unseen[0] - episode) / 100;
                        }


                    }
                });
        },
        isShowWatched: function () {
            var tvdb_id = _this.model.get('tvdb_id');
            var imdb_id = _this.model.get('imdb_id');
            episodes.forEach(function (episode, index, array) {
                var value = {
                    tvdb_id: tvdb_id,
                    imdb_id: imdb_id,
                    season: episode.season,
                    episode: episode.episode,
                    from_browser: true
                };
                Database.checkEpisodeWatched(value)
                    .then(function (watched) {
                    });
            });
        },
        startStreaming: function (e) {
            var that = this;

            if (AdvSettings.get('playNextEpisodeAuto')) {
                _.each(this.model.get('episodes'), function (value) {
                    var epaInfo = {
                        id: parseInt(value.season) * 100 + parseInt(value.episode),
                        backdrop: that.model.get('images').fanart,
                        defaultSubtitle: Settings.subtitle_language,
                        episode: value.episode,
                        season: value.season,
                        title: that.model.get('title') + ' - ' + i18n.__('Season %s', value.season) + ', ' + i18n.__('Episode %s', value.episode) + ' - ' + value.title,
                        torrents: value.torrents,
                        extract_subtitle: {
                            type: 'tvshow',
                            imdbid: that.model.get('imdb_id'),
                            tvdbid: value.tvdb_id,
                            season: value.season,
                            episode: value.episode
                        },
                        episode_id: value.tvdb_id,
                        tvdb_id: that.model.get('tvdb_id'),
                        imdb_id: that.model.get('imdb_id'),
                        device: App.Device.Collection.selected,
                        cover: that.model.get('images').poster,
                        status: that.model.get('status'),
                        type: 'episode'
                    };
                });
            } else {
        },
    });
})(window.App);
