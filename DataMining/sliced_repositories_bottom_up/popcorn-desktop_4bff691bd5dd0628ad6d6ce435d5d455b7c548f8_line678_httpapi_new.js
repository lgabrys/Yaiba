(function (App) {
	var rpc = require('json-rpc2');
	var server;
	var Q = require('q');
	var initServer = function () {
		server = rpc.Server({
			'headers': { // allow custom headers is empty by default
			}
		});
		server.expose('ping', function (args, opt, callback) {
		});
		server.expose('volume', function (args, opt, callback) {
			var volume = 1;
			if (view !== undefined && view.player !== undefined) {
				if (args.length > 0) {
					volume = parseFloat(args[0]);
				}
			}
		});
		server.expose('toggleplaying', function (args, opt, callback) {
		});
		server.expose('togglemute', function (args, opt, callback) {
		});
		server.expose('togglefullscreen', function (args, opt, callback) {
			popcornCallback(callback, false, {
			});
		});
		server.expose('togglefavourite', function (args, opt, callback) {
		});
		server.expose('toggletab', function (args, opt, callback) {
		});
		server.expose('togglewatched', function (args, opt, callback) {
		});
		server.expose('togglequality', function (args, opt, callback) {
		});
		server.expose('showslist', function (args, opt, callback) {
		});
		server.expose('movieslist', function (args, opt, callback) {
		});
		server.expose('animelist', function (args, opt, callback) {
		});
		server.expose('showwatchlist', function (args, opt, callback) {
		});
		server.expose('showfavourites', function (args, opt, callback) {
		});

		server.expose('showsettings', function (args, opt, callback) {
			popcornCallback(callback);
		});
		server.expose('showabout', function (args, opt, callback) {
		});
		server.expose('getplaying', function (args, opt, callback) {
			var view = App.PlayerView;
			if (view !== undefined && !view.isClosed) {
				var result = {
					playing: !view.player.paused(),
					title: view.model.get('title'),
					movie: view.isMovie(),
					quality: view.model.get('quality'),
					downloadSpeed: view.model.get('downloadSpeed'),
					uploadSpeed: view.model.get('uploadSpeed'),
					activePeers: view.model.get('activePeers'),
					volume: view.player.volume(),
					currentTime: App.PlayerView.player.currentTime(),
					duration: App.PlayerView.player.duration(),
					streamUrl: $('#video_player video') === undefined ? '' : $('#video_player video').attr('src'),
					selectedSubtitle: '',
					isFullscreen: nativeWindow.isFullscreen
				};
				if (result.movie) {
					result['imdb_id'] = view.model.get('imdb_id');
				} else {
					result['tvdb_id'] = view.model.get('tvdb_id');
					result['season'] = view.model.get('season');
					result['episode'] = view.model.get('episode');
				}
				if (App.PlayerView.player.textTrackDisplay.children().length > 0) {
					result.selectedSubtitle = App.PlayerView.player.textTrackDisplay.children()[0].language();
				}
			} else {
		});
		server.expose('setselection', function (args, opt, callback) {
		});
		server.expose('getselection', function (args, opt, callback) {
		});
		server.expose('getcurrentlist', function (args, opt, callback) {
		});
		server.expose('getplayers', function (args, opt, callback) {
		});
		server.expose('setplayer', function (args, opt, callback) {
		});
		server.expose('getviewstack', function (args, opt, callback) {
		});
		server.expose('getfullscreen', function (args, opt, callback) {
		});
		server.expose('getcurrenttab', function (args, opt, callback) {
		});
		server.expose('getgenres', function (args, opt, callback) {
			switch (App.currentview) {
			}
		});
		server.expose('getsorters', function (args, opt, callback) {
			switch (App.currentview) {
				break;
			}
		});
		server.expose('gettypes', function (args, opt, callback) {
		});
		server.expose('filtergenre', function (args, opt, callback) {
			if (args.length <= 0) {
				popcornCallback(callback, 'Arguments missing');
			}
		});
		server.expose('filtersorter', function (args, opt, callback) {
		});
		server.expose('filtertype', function (args, opt, callback) {
			if (args.length <= 0) {
				popcornCallback(callback, 'Arguments missing');
			}
			$('.types .dropdown-menu a').filter(function () {
				return $(this).attr('data-value').toLowerCase() === args[0].toLowerCase();
			}).click();
		});

		server.expose('filtersearch', function (args, opt, callback) {
		});
		server.expose('clearsearch', function (args, opt, callback) {
		});
		server.expose('startstream', function (args, opt, callback) {
		});
		server.expose('seek', function (args, opt, callback) {
			args = parseFloat(args[0]);
		});
		server.expose('up', function (args, opt, callback) {
		});
		server.expose('down', function (args, opt, callback) {
		});
		server.expose('left', function (args, opt, callback) {
		});
		server.expose('right', function (args, opt, callback) {
		});
		server.expose('enter', function (args, opt, callback) {
		});

		server.expose('back', function (args, opt, callback) {
		});
		server.expose('previousseason', function (args, opt, callback) {
		});
		server.expose('nextseason', function (args, opt, callback) {
		});
		server.expose('selectepisode', function (args, opt, callback) {
			if (args.length <= 0) {
				popcornCallback(callback, 'Arguments missing');
			}
		});
		server.expose('subtitleoffset', function (args, opt, callback) {
		});
		server.expose('getsubtitles', function (args, opt, callback) {
		});
		server.expose('setsubtitle', function (args, opt, callback) {
		});
		server.expose('watchtrailer', function (args, opt, callback) {
		});
		server.expose('getstreamurl', function (args, opt, callback) {
		});
		server.expose('listennotifications', function (args, opt, callback) {
		});
	};
	function popcornCallback(callback, err, result) {
		if (result === undefined) {
			result = {};
		}
		result['popcornVersion'] = App.settings.version;
	}
	App.vent.on('initHttpApi', function () {
		Q(initServer)
	});
})(window.App);
