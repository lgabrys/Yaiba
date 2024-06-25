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

	localStorage.clear();
	fs.unlinkSync(path.join(data_path, 'data/watched.db'), function (err) {
	});
	fs.unlinkSync(path.join(data_path, 'data/bookmarks.db'), function (err) {
		if (err) {
		}
	});
}
var App = new Backbone.Marionette.Application();
_.extend(App, {
	Controller: {},
});
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

	var height = parseInt(localStorage.height ? localStorage.height : Settings.defaultHeight);
	var y = parseInt(localStorage.posY ? localStorage.posY : -1);

	// reset app width when the width is bigger than the available width
	if (screen.availHeight < height) {
		height = screen.availHeight;
	}
	if (y < 0 || (y + height) > screen.height) {
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
window.ondragenter = function (e) {
	$('#drop-mask').on('dragenter',
		function (e) {
			$('.drop-indicator').show();
		});
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
