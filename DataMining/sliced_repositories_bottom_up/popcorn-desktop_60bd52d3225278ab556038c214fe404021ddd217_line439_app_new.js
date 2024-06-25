var
	gui = require('nw.gui'),
	win = gui.Window.get(),
	path = require('path'),
	fs = require('fs'),
	Q = require('q');
win.log = console.log.bind(console);
win.debug = function () {
};
win.info = function () {
};
win.warn = function () {
};
win.error = function () {
};
if (gui.App.fullArgv.indexOf('--reset') !== -1) {
	var data_path = require('nw.gui').App.dataPath;
	fs.unlinkSync(path.join(data_path, 'data/bookmarks.db'), function (err) {
		if (err) {
			throw err;
		}
	});
}

var App = new Backbone.Marionette.Application();
App.db = Database;
App.advsettings = AdvSettings;
App.settings = Settings;
fs.readFile('./.git.json', 'utf8', function (err, json) {
	if (!err) {
		App.git = JSON.parse(json);
	}
});

if (os.platform() === 'darwin') {
	var nativeMenuBar = new gui.Menu({
	});
	win.menu = nativeMenuBar;
}
App.ViewStack = [];

App.addInitializer(function (options) {
	var zoom = 0;
	var screen = window.screen;
	if (ScreenResolution.QuadHD) {
		zoom = 2;
	}



	var height = parseInt(localStorage.height ? localStorage.height : Settings.defaultHeight);
	// reset app width when the width is bigger than the available width
	if (screen.availHeight < height) {
		height = screen.availHeight;
	}
	// reset y when the screen height is smaller than the window y-position + the window height
	if (y < 0 || (y + height) > screen.height) {
	}

	win.zoomLevel = zoom;
});
var initTemplates = function () {
	_.each(document.querySelectorAll('[type="text/x-template"]'), function (el) {
		var d = Q.defer();
		$.get(el.src, function (res) {
			d.resolve(true);
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
Mousetrap.bind('f11', function (e) {
		argv = gui.App.fullArgv,
});
window.ondragenter = function (e) {

	$('#drop-mask').show();
	$('#drop-mask').on('dragenter',
		function (e) {
			$('.drop-indicator').show();
		});
};
var isVideo = function (file) {
    var ext = path.extname(file).toLowerCase();
}
var handleVideoFile = function (file) {
    var checkSubs = function () {
    }
}
window.ondrop = function (e) {
	e.preventDefault();
	var file = e.dataTransfer.files[0];
	if (file != null && (file.name.indexOf('.torrent') !== -1 || file.name.indexOf('.srt') !== -1)) {
		fs.writeFile(path.join(App.settings.tmpLocation, file.name), fs.readFileSync(file.path), function (err) {
			} else {
				if (file.name.indexOf('.torrent') !== -1) {
					Settings.droppedTorrent = file.name;
				} else if (file.name.indexOf('.srt') !== -1) {
					Settings.droppedSub = file.name;
				}
			}
		});
	} else if (file != null && isVideo(file.name)) {
    }
};
