(function(App) {
    var BUFFERING_SIZE = 10 * 1024 * 1024;
    var peerflix = require('peerflix');
    var engine = null;
    var watchState = function(stateModel) {
        if (engine != null) {
            var swarm = engine.swarm;
            var state = 'connecting';
            if(swarm.downloaded > BUFFERING_SIZE) {
                state = 'ready';
            } else if(swarm.downloaded) {
                state = 'downloading';
            } else if(swarm.wires.length) {
                state = 'startingDownload';
            }
            if(state != 'ready') {
            }
        }
    };
    var handleTorrent = function(torrent, stateModel) {
        var tmpFilename = torrent.info.infoHash;
        tmpFilename = tmpFilename.replace(/([^a-zA-Z0-9-_])/g, '_') +'-'+ (new Date()*1);
        var tmpFile = path.join(tmpFolder, tmpFilename);

        engine = peerflix(torrent.info, {
            connections: 100, // Max amount of peers to be connected to.
            path: tmpFile, // we'll have a different file name for each stream also if it's same torrent in same session
            buffer: (1.5 * 1024 * 1024).toString() // create a buffer on torrent-stream
        });
        var streamInfo = new App.Model.StreamInfo({engine: engine});
        var checkReady = function() {
            if(stateModel.get('state') === 'ready') {

                // we need subtitle in the player
                streamInfo.set('subtitle', torrent.subtitle);
            }
        };
    };
})(window.App);
