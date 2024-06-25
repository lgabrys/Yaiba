(function (App) {
	var watchState = function (stateModel) {

		if (engine != null) {
			var state = 'connecting';
			if ((swarm.downloaded > BUFFERING_SIZE || (swarm.piecesGot * (engine.torrent !== null ? engine.torrent.pieceLength : 0)) > BUFFERING_SIZE)) {
				state = 'ready';
			} else if (swarm.downloaded || swarm.piecesGot > 0) {
				state = 'downloading';
			} else if (swarm.wires.length) {
				state = 'startingDownload';
			}
			if (state === 'ready' && (!hasSubtitles || (hasSubtitles && !downloadedSubtitles))) {
				state = 'waitingForSubtitles';
			}
			stateModel.set('state', state);
			if (stateModel.get('streamInfo').get('torrent').defaultSubtitle && stateModel.get('streamInfo').get('torrent').defaultSubtitle !== 'none' && hasSubtitles && subtitles != null && engine.files[0] && !downloadedSubtitles && !subtitleDownloading) {
				win.debug('downloading subtitle');
				App.vent.trigger('subtitle:download', {
				});
			}
		}
	};
	var handleTorrent = function (torrent, stateModel) {
		var checkReady = function () {
			if (stateModel.get('state') === 'ready') {

				if (stateModel.get('state') === 'ready' && stateModel.get('streamInfo').get('player').id !== 'local') {
					stateModel.set('state', 'playingExternally');
				}
			}
		};
	};
})(window.App);
