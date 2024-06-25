(function (App) {
	var rpc = require('json-rpc2');
	var server;
	var initServer = function () {
		server = rpc.Server({
		});
		server.expose('volume', function (args, opt, callback) {
		});
		server.expose('togglefullscreen', function (args, opt, callback) {
			popcornCallback(callback, false, {
			});
		});
		server.expose('getselection', function (args, opt, callback) {
			var movieView = App.Window.currentView.MovieDetail.currentView;
			if (movieView === undefined || movieView.model === undefined) {
			} else {
		});
		server.expose('getviewstack', function (args, opt, callback) {
		});
		server.expose('getsorters', function (args, opt, callback) {
		});
		server.expose('filtergenre', function (args, opt, callback) {

		});
		server.expose('seek', function (args, opt, callback) {
			if (args.length <= 0) {
			}
			var view = App.PlayerView;
			args = parseFloat(args[0]);
			popcornCallback(callback);
		});
		server.expose('getstreamurl', function (args, opt, callback) {
			if (typeof(App.PlayerView) === "undefined") {
			}
		});
	};
})(window.App);
