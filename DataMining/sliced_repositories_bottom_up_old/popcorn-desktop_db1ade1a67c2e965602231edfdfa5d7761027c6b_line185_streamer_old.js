(function (App) {
    var WebTorrentStreamer = function () {
        // Boolean to indicate if the video file is ready
        this.stopped = true;
    };
    WebTorrentStreamer.prototype = {
        initExistTorrents: function() {
          fs.readdir(App.settings.tmpLocation + '/TorrentCache/', (err, files) => {
            async.eachLimit(files, 1, function (file, cb) {
              if (/^[a-f0-9]{40}$/i.test(file)) {
                fs.readFile(App.settings.tmpLocation + '/TorrentCache/' + file, 'utf8', (err, data) => {
                  App.WebTorrent.add(data, {
                      announce  : Settings.trackers.forced,
                  }, (torrent) => {
                  });
                });
              }
            }, function(err) {
              if (err) {
              }
            });
          });
        },
        start: function(model) {
            if (App.WebTorrent.destroyed) {
                this.stop();
            }
            this.setModels(model);
            this.fetchTorrent(this.torrentModel.get('torrent')).then(function (torrent) {
                this.handleTorrent(torrent);
            }.bind(this)).then(this.waitForBuffer.bind(this)).catch(this.handleErrors.bind(this));
        },
        fetchTorrent: function(torrentInfo) {
            return new Promise(function (resolve, reject) {
                var uri = torrentInfo.magnet || torrentInfo.url || torrentInfo;
                const parseTorrent = require('parse-torrent');
                var infoHash = '';
                try { infoHash = parseTorrent(uri).infoHash; } catch (err) {}
                if (!this.torrent) {
                  this.torrent = App.WebTorrent.add(uri, {
                  });
                }

                const fs = require('fs');
                fs.writeFileSync(App.settings.tmpLocation + '/TorrentCache/' + infoHash, uri);
            }.bind(this));
        },
      };
})(window.App);
