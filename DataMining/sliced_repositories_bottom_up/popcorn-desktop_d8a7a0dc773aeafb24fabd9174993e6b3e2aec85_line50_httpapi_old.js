(function (App) {
	var rpc = require('json-rpc2');
	var server;
	var initServer = function () {
		server = rpc.Server({
		});
		server.expose('toggleplaying', function (args, opt, callback) {
		});
		server.expose('togglefullscreen', function (args, opt, callback) {
			nativeWindow = require('nw.gui').Window.get();
			popcornCallback(callback, false { "fullscreen": nativeWindow.isFullscreen });
		});
	};
})(window.App);
