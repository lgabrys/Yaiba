var
	gui = require('nw.gui'),
	win = gui.Window.get(),
	path = require('path'),
	fs = require('fs'),
win.log = console.log.bind(console);
win.debug = function () {
};
win.info = function () {
	var params = Array.prototype.slice.call(arguments, 1);
};
win.warn = function () {
	var params = Array.prototype.slice.call(arguments, 1);
};
win.error = function () {
	var params = Array.prototype.slice.call(arguments, 1);
};


if (gui.App.fullArgv.indexOf('--reset') !== -1) {

	var data_path = require('nw.gui').App.dataPath;

	fs.unlinkSync(path.join(data_path, 'data/watched.db'), function (err) {
	});
	fs.unlinkSync(path.join(data_path, 'data/bookmarks.db'), function (err) {
	});
}
var App = new Backbone.Marionette.Application();
_.extend(App, {
	Controller: {},
});
// set database
App.db = Database;
App.advsettings = AdvSettings;
App.settings = Settings;
fs.readFile('./.git.json', 'utf8', function (err, json) {
	if (!err) {
		App.git = JSON.parse(json);
	}
});
App.ViewStack = [];
App.addInitializer(function (options) {
	var zoom = 0;
	var screen = window.screen;
	if (ScreenResolution.QuadHD) {
		zoom = 2;
	}
	var width = parseInt(localStorage.width ? localStorage.width : Settings.defaultWidth);
	var height = parseInt(localStorage.height ? localStorage.height : Settings.defaultHeight);
	var x = parseInt(localStorage.posX ? localStorage.posX : -1);
	var y = parseInt(localStorage.posY ? localStorage.posY : -1);

	if (screen.availWidth < width) {
		width = screen.availWidth;
	}
	if (screen.availHeight < height) {
		height = screen.availHeight;
	}
	if (x < 0 || (x + width) > screen.width) {
		x = Math.round((screen.availWidth - width) / 2);
	}
	if (y < 0 || (y + height) > screen.height) {
		win.info('Window out of view, recentering y-pos');
		y = Math.round((screen.availHeight - height) / 2);
	}
	win.zoomLevel = zoom;
});
var initTemplates = function () {
	var ts = [];
	_.each(document.querySelectorAll('[type="text/x-template"]'), function (el) {
		$.get(el.src, function (res) {
			el.innerHTML = res;
		});
	});
};
win.on('resize', function (width, height) {
	localStorage.width = Math.round(width);
	localStorage.height = Math.round(height);
});
win.on('move', function (x, y) {
	localStorage.posX = Math.round(x);
	localStorage.posY = Math.round(y);

});
// Drag n' Drop Torrent Onto PT Window to start playing (ALPHA)
window.ondragenter = function (e) {
};
var handleTorrent = function (torrent) {
};
window.ondrop = function (e) {
	var file = e.dataTransfer.files[0];
	if (file != null && (file.name.indexOf('.torrent') !== -1 || file.name.indexOf('.srt') !== -1)) {
		var reader = new FileReader();
		reader.onload = function (event) {
			var content = reader.result;
			fs.writeFile(path.join(App.settings.tmpLocation, file.name), content, function (err) {
				} else {
					if (file.name.indexOf('.torrent') !== -1) {
						Settings.droppedTorrent = file.name;
					} else if (file.name.indexOf('.srt') !== -1) {
						Settings.droppedSub = file.name;
					}
				}
			});
		};
	} else {
};
