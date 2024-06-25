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
		});

		server.expose('togglefavourite', function (args, opt, callback) {
			Mousetrap.trigger('f');
		});
		server.expose('getselection', function (args, opt, callback) {
			if(movieView == undefined || movieView.model == undefined) {
				var index = $('.item.selected').index();
				if(args.length > 0) {
					index = parseFloat(args[0]);
				} else {
					if (index === -1) {
						index = 0;
					} else {
						index = index + 1;
					}
				}
				var result = App.Window.currentView.Content.currentView.ItemList.currentView.collection.models[index].attributes;
				if(result != undefined) {
					popcornCallback(callback, false, result);
				} else {
			} else {
		});
		server.expose('getfullscreen', function (args, opt, callback) {
			nativeWindow = require('nw.gui').Window.get();
			popcornCallback(callback, false { "fullscreen": nativeWindow.isFullscreen });
		});
	};
})(window.App);
