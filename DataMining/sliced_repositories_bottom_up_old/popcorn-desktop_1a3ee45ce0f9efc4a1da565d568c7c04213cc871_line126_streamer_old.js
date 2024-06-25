(function (App) {
    var peerflix = require('peerflix');
    var path = require('path');
    var engine = null;
    var watchState = function (stateModel) {

        if (engine != null) {

            if (stateModel.get('streamInfo').get('torrent').defaultSubtitle && stateModel.get('streamInfo').get('torrent').defaultSubtitle !== 'none' && hasSubtitles && subtitles != null && engine.files[0] && !downloadedSubtitles && !subtitleDownloading) {
                App.vent.trigger('subtitle:download', {
                    path: path.join(engine.path, engine.files[0].path)
                });
            }
        }
    };
    var handleTorrent = function (torrent, stateModel) {
        engine = peerflix(torrent.info, {
        });
        engine.swarm.piecesGot = 0;
        engine.swarm.cachedDownload = 0;
        engine.on('verify', function (index) {
            engine.swarm.piecesGot += 1;
        });
        var checkReady = function () {
            if (stateModel.get('state') === 'ready') {

                if (stateModel.get('state') === 'ready' && stateModel.get('streamInfo').get('player').id !== 'local') {
                    stateModel.set('state', 'playingExternally');
                }
            }
        };
    };
})(window.App);
