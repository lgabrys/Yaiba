(function (App) {
    var WebTorrentStreamer = function () {

    };
    WebTorrentStreamer.prototype = {
        initExistTorrents: function() {
            const fs = require('fs');
            fs.readdir(App.settings.tmpLocation, (err, files) => {
                files.forEach(file => {
                    if (/^[a-f0-9]{40}$/i.test(file) && fs.existsSync(App.settings.tmpLocation + '/TorrentCache/' + file)) {
                        fs.readFile(App.settings.tmpLocation + '/TorrentCache/' + file, 'utf8', (err, data) => {
                            this.torrent = App.WebTorrent.add(data, {
                                path: App.settings.tmpLocation + '/' + file,
                                maxConns: parseInt(Settings.connectionLimit, 10) || 55,
                            });
                        });
                    }
                });
            });
        },
      };
})(window.App);
