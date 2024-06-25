(function (App) {
    var engine = null;
    var subtitles = null;
    var downloadedSubtitles = false;
    var watchState = function (stateModel) {
        if (engine !== null) {
            var swarm = engine.swarm;
            if ((swarm.downloaded > BUFFERING_SIZE || (swarm.piecesGot * (engine.torrent !== null ? engine.torrent.pieceLength : 0)) > BUFFERING_SIZE)) {
            } else if (swarm.downloaded || swarm.piecesGot > 0) {
            } else if (swarm.wires.length) {
            // We only download subtitle once file is ready (to get path)
            // No need to download subtitles
            if (!stateModel.get('streamInfo').get('torrent').defaultSubtitle || stateModel.get('streamInfo').get('torrent').defaultSubtitle === 'none') {
                downloadedSubtitles = true;
            }
        }
    };
    var handleTorrent = function (torrent, stateModel) {
        subtitles = [];
    };
})(window.App);
