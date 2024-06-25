(function (App) {
    var _this, bookmarked;
    var ShowDetail = Marionette.View.extend({
        events: {
            'click .close-icon': 'closeDetails',
            'dblclick .tab-episode': 'dblclickEpisode',
        },
        toggleFavorite: function (e) {
            if (bookmarked !== true) {
                bookmarked = true;
            } else {
                bookmarked = false;
            }
        },

        initialize: function () {
            _this = this;

            App.vent.on('viewstack:push', function () {
                if (_.last(App.ViewStack) !== _this.className) {
                    _this.unbindKeyboardShortcuts();
                }
            });
            App.vent.on('show:watched:' + this.model.id,
                _.bind(this.onWatched, this));
            App.vent.on('show:unwatched:' + this.model.id,
                _.bind(this.onUnWatched, this));
        },
        onAttach: function () {
            bookmarked = App.userBookmarks.indexOf(this.model.get('imdb_id')) !== -1;
            var nobg = 'images/bg-header.jpg';
            var images = this.model.get('images');
            var backdrop = this.model.get('backdrop');
            if (!backdrop) {
              backdrop = images.banner || nobg;
            }
            var bgCache = new Image();
            bgCache.src = backdrop;
            bgCache.onload = function () {
                try {
                        .addClass('fadein');
                } catch (e) {}
                bgCache = null;
            };
            bgCache.onerror = function () {
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

                                if (!idx) {
                                    // switch back to firstUnwatched method if idx not found
                                    unseen.push(first);
                                    episode = unseen[0] % 100;
                                    season = (unseen[0] - episode) / 100;
                                } else {
                                    var next_episode = episodes[idx + 1];
                                    episode = next_episode % 100;
                                    season = (next_episode - episode) / 100;
                                }
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
                    .then(function (watched) {
                    });
            }, 100);
        },
        markShowAsWatched: function () {
            var episodes = _this.model.get('episodes');
            episodes.forEach(function (episode, index, array) {
                var value = {
                    tvdb_id: tvdb_id,
                    imdb_id: imdb_id,
                    episode_id: episode.tvdb_id,
                    season: episode.season,
                    episode: episode.episode,
                    from_browser: true
                };
                    .then(function (watched) {
                        if (!watched) {
                            App.vent.trigger('show:watched', value, 'seen');
                        }
                    });
            });
        },
        markWatched: function (value, state) {
            if (value.tvdb_id === _this.model.get('tvdb_id')) {
            }
        },
        startStreaming: function (e) {
            var that = this;
            var episode = $(e.currentTarget).attr('data-episode');
            var epInfo = {
                type: 'show',
                imdbid: imdbid,
                tvdbid: that.model.get('tvdb_id'),
                episode_id: episode_id,
                season: season,
                episode: episode
            };

            var images = this.model.get('images');
            if (AdvSettings.get('playNextEpisodeAuto') && this.model.get('imdb_id').indexOf('mal') === -1) {
                _.each(this.model.get('episodes'), function (value) {
                    var epaInfo = {
                        id: parseInt(value.season) * 100 + parseInt(value.episode),
                        defaultSubtitle: Settings.subtitle_language,
                        episode: value.episode,
                        season: value.season,
                        title: that.model.get('title') + ' - ' + i18n.__('Season %s', value.season) + ', ' + i18n.__('Episode %s', value.episode) + ' - ' + value.title,
                        torrents: value.torrents,
                        extract_subtitle: {
                            type: 'show',
                            imdbid: that.model.get('imdb_id'),
                            tvdbid: value.tvdb_id.toString(),
                            season: value.season,
                            episode: value.episode
                        },
                        episode_id: value.tvdb_id,
                        tvdb_id: that.model.get('tvdb_id'),
                        imdb_id: that.model.get('imdb_id'),
                        device: App.Device.Collection.selected,
                        poster: that.model.get('poster'),
                        backdrop: that.model.get('backdrop') || images.banner,
                        status: that.model.get('status'),
                        type: 'episode'
                    };
                });
            } else {
        },
    });
})(window.App);
