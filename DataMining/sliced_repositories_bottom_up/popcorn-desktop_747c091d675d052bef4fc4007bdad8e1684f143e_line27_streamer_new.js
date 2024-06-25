(function(App) {
    var BUFFERING_SIZE = 10 * 1024 * 1024;
    var engine = null;
    var hasSubtitles = false;
    var watchState = function(stateModel) {
        if (engine != null) {

            var swarm = engine.swarm;
            var state = 'connecting';
            if((swarm.downloaded > BUFFERING_SIZE || (swarm.piecesGot * (engine.torrent !== null ? engine.torrent.pieceLength : 0)) > BUFFERING_SIZE) && hasSubtitles) {
                state = 'ready';
            }
        }
    };
})(window.App);
