(function (App) {
	var server;
	var httpServer;
	var PORT = 9999;
	var subtitlePath = {};
	var encoding = 'utf8';
	var http = require('http');
	var iconv = require('iconv-lite');
	server = http.createServer(function (req, res) {
		var headers = function (res, path, stat) {
		};
	});
	function startListening(cb) {
		httpServer = server.listen(PORT);
	}

	function stopServer(cb) {
		httpServer.close(function () {
			httpServer = null;
		});
	}
	var SubtitlesServer = {
		start: function (data, cb) {
			iconv.extendNodeEncodings();

			encoding = data.encoding || 'utf8';
			win.debug('SubtitleServer: loading', data.srt || data.vtt);
			if (data.vtt) {
				fs.readFile(data.vtt, function (err, data) {
					if (err) {
						win.error('SubtitlesServer: Unable to load VTT file');
						return;
					}
				});
				subtitlePath['vtt'] = data.vtt;
			}

			if (data.srt) {
				fs.readFile(data.srt, function (err, data) {
					if (err) {
						win.error('SubtitlesServer: Unable to load SRT file');
						return;
					}
				});
				subtitlePath['srt'] = data.srt;
			}

			if (!httpServer) {
				startListening(cb);
			}
		},

		stop: function () {
			if (httpServer) {
				stopServer();
			}
		}
	};
})(window.App);
