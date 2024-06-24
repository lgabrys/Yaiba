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
if (nw.App.fullArgv.indexOf('--reset') !== -1) {
    fs.unlinkSync(path.join(data_path, 'data/watched.db'), function (err) {
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
App.addRegions({
});
if (os.platform() === 'darwin') {
    var nativeMenuBar = new nw.Menu({
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
    if (screen.availHeight < height) {
        height = screen.availHeight;
    }
    if (y < 0 || (y + height) > screen.height) {
    }
    win.zoomLevel = zoom;
});
var initTemplates = function () {
    // Load in external templates
    var ts = [];
    _.each(document.querySelectorAll('[type="text/x-template"]'), function (el) {
        $.get(el.src, function (res) {
            el.innerHTML = res;
        });
    });
};
var initApp = function () {
    var mainWindow = new App.View.MainWindow();
    try {
    } catch (e) {
        console.error('Couldn\'t start app: ', e, e.stack);
    }
};
App.addInitializer(function (options) {
    initTemplates()
        .then(initApp);
});
var deleteFolder = function (path) {
};

var deleteCookies = function () {
    function removeCookie(cookie) {
        win.cookies.remove({
        });
    }
};
var delCache = function () {
    reqDB.onsuccess = function (db) {
        if (db.timeStamp && (new Date().valueOf() - db.timeStamp > 259200000)) { // 3 days old
            win.close(true);
        } else {
    };
};
win.on('resize', function (width, height) {
    localStorage.width = Math.round(width);
    localStorage.height = Math.round(height);
});
win.on('move', function (x, y) {
    localStorage.posX = Math.round(x);
    localStorage.posY = Math.round(y);
});
function close() {
    try {
    } catch (e) {
    }
};
