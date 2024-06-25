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
            }
            this.fetchTorrent(this.torrentModel.get('torrent')).then(function (torrent) {
                this.handleTorrent(torrent);
                return this.createServer();
            }.bind(this)).then(this.waitForBuffer.bind(this)).catch(this.handleErrors.bind(this));
        },

        fetchTorrent: function(torrentInfo) {
            return new Promise(function (resolve, reject) {
                var uri = torrentInfo.magnet || torrentInfo.url || torrentInfo;
                for(const t of App.WebTorrent.torrents) {
                    if (t.infoHash === infoHash) {
                        this.torrent = t;
                    }
                }

                if (!this.torrent) {
                  this.torrent = App.WebTorrent.add(uri, {
                  });
                }
            }.bind(this));
        },
        openFileSelector: function (torrent) {
            for (var f in torrent.files) {
            }
        },
        lookForMetadata: function (torrent) {
            if (this.stopped) {
            }
        },
        selectFile: function (torrent) {

            if (!fileIndex && parseInt(fileIndex) !== 0) {
                for (var i in torrent.files) {
                }
            } else {
        },
        createServer: function (port) {
            return new Promise(function (resolve) {
                var serverPort = parseInt((port || Settings.streamPort), 10);
                if (!serverPort) {
                    serverPort = this.generatePortNumber();
                }
            }.bind(this));
        },
        handleStreamInfo: function () {
            this.torrentModel.on('change', this.streamInfo.updateInfos.bind(this.streamInfo));
        },
        waitForBuffer: function (url) {

            this.video.play().then(function () {
            }.bind(this)).catch(function (error) {
                if (!this.stopped) {
                    this.canPlay = true;
                    this.video.src = '';
                    this.video.load();
                }
            }.bind(this));
        },

        setModels: function (model) {
            App.vent.trigger('stream:started', this.stateModel);
        },
      };
})(window.App);
