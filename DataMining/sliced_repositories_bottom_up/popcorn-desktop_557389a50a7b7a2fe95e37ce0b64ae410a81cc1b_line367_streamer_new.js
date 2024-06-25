(function (App) {
    'use strict';

    var WebTorrentStreamer = function () {
        // Torrent Backbone Model

        // Interval controller for StreamInfo view, which keeps showing ratio/download/upload info.
        // Boolean to indicate if the process was interrupted
    };
    WebTorrentStreamer.prototype = {
        start: function(model) {
            this.fetchTorrent(this.torrentModel.get('torrent')).then(function (torrent) {
                this.handleTorrent(torrent);
            }.bind(this)).then(this.waitForBuffer.bind(this)).catch(this.handleErrors.bind(this));
        },
        stop: function() {
            if (this.webtorrent) {
                AdvSettings.set('totalDownloaded', Settings.totalDownloaded + this.torrentModel.get('torrent').downloaded);
                this.webtorrent.destroy();
            }
            this.stateModel = null;


            win.info('Streaming cancelled');
        },
        fetchTorrent: function(torrentInfo) {
            return new Promise(function (resolve, reject) {
                var client = this.getWebTorrentInstance();
            }.bind(this));
        },
        lookForImages: function (metadatas) {
        },
        lookForMetadata: function (torrent) {
            if (this.stopped) {
                return;
            }
            App.Trakt.client.matcher.match({
            }).then(function(metadatas) {
                var props = {};
                var qualities = {
                    SD: '480p',
                    HD: '720p',
                    FHD: '1080p'
                };
                props.quality = qualities[metadatas.quality] || false;
                switch (metadatas.type) {
                        props.imdb_id = metadatas.movie.ids.imdb;
                        props.title = metadatas.movie.title;
                        props.tvdb_id = metadatas.show.ids.tvdb;
                        props.episode_id = metadatas.episode.ids.tvdb;
                        props.imdb_id = metadatas.show.ids.imdb;
                        props.episode = metadatas.episode.number;
                        props.season = metadatas.episode.season;
                        props.title = metadatas.show.title + ' - ' + i18n.__('Season %s', metadatas.episode.season) + ', ' + i18n.__('Episode %s', metadatas.episode.number) + ' - ' + metadatas.episode.title;
                }

            }.bind(this)).catch(function(err) {
        },

        waitForBuffer: function (url) {
            }.bind(this)).catch(function (error) {
                if (!this.stopped) {
                    this.video.src = '';
                }
            }.bind(this));
        },
        setModels: function (model) {
            this.stopped = false;
            this.stateModel = new Backbone.Model({
                state: 'connecting',
                title: '',
                streamInfo: this.streamInfo
            });
        },
        watchState: function () {
            var torrentModel = this.torrentModel.get('torrent');
            var player = this.streamInfo.get('device');
            var state = 'connecting'; // default state
            if (this.canPlay) {
                if (player && player.id !== 'local') {
                    state = 'playingExternally'; // file ready to be streamed to external player
                } else {
                    state = 'ready'; // file can be played
                }
            } else if (torrentModel.downloaded) {
                if (torrentModel.downloadSpeed) {
                    state = 'downloading'; // is actively downloading
                } else {
                    state = 'startingDownload'; // is verifying pieces
                }
            }
            if (state === 'ready' && !this.subtitleReady) {
                state = 'waitingForSubtitles'; // can be played but subs aren't there yet
            }
            if (state === 'ready' || state === 'playingExternally' || state === 'waitingForSubtitles' ) {
            } else {
        },
    };
})(window.App);
