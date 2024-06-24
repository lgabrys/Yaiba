(function (App) {
		onAttach: function () {
			if ($('.loading .maximize-icon').is(':visible')) {
				let currentHash;
				try { currentHash = App.LoadingView.model.attributes.streamInfo.attributes.torrentModel.attributes.torrent.infoHash; } catch(err) {}
			}
		},
		addTorrentHooks() {
		},
		addTorrentToList(torrent) {
			$('.notorrents-info').hide();
			if ($('.tab-torrent.active').length <= 0) {
			}

		},
		onAddTorrent: function (torrent) {
			const activeTorrentCount = App.WebTorrent.torrents.filter(item => !item.paused).length;
			if (!torrent.paused && activeTorrentCount >= Settings.maxActiveTorrents) {
			}
		},
