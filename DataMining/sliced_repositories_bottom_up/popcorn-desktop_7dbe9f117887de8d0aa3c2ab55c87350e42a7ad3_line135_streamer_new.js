(function (App) {
    var WebTorrentStreamer = function () {
        // Boolean to indicate if the video file is ready
        this.stopped = true;
    };
    WebTorrentStreamer.prototype = {
        initExistTorrents: function() {
            const fs = require('fs');
            fs.readdir(App.settings.tmpLocation, (err, files) => {
                files.forEach(file => {
                    if (/^[a-f0-9]{40}$/i.test(file) && fs.existsSync(App.settings.tmpLocation + '/TorrentCache/' + file)) {
                        fs.readFile(App.settings.tmpLocation + '/TorrentCache/' + file, 'utf8', (err, data) => {
                            this.torrent = App.WebTorrent.add(data, {
                                tracker: Settings.trackers.forced
                            });
                        });
                    }
                });
            });
        },
        start: function(model) {
            if (App.WebTorrent.destroyed) {
                this.stop();
            }

            this.fetchTorrent(this.torrentModel.get('torrent')).then(function (torrent) {
                return this.createServer();
            }.bind(this)).then(this.waitForBuffer.bind(this)).catch(this.handleErrors.bind(this));
        },
        stop: function() {
            if (this.torrent) {
                AdvSettings.set('totalDownloaded', Settings.totalDownloaded + this.downloaded);
                AdvSettings.set('totalUploaded', Settings.totalUploaded + this.uploaded);
            }

            if (this.video) {
                this.video.src = '';
            }
        },
        fetchTorrent: function(torrentInfo) {
            return new Promise(function (resolve, reject) {
                var uri = torrentInfo.magnet || torrentInfo.url || torrentInfo;
                const fs = require('fs');
                fs.writeFileSync(App.settings.tmpLocation + '/TorrentCache/' + this.torrent.infoHash, uri);
            }.bind(this));
        },
      };
})(window.App);
