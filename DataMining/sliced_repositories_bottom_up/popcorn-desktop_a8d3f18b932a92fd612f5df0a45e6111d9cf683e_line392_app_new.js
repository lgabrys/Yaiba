win.log = console.log.bind(console);
win.debug = function () {
};
win.info = function () {
};
win.warn = function () {
};
win.error = function () {
};
if (nw.App.fullArgv.indexOf('--reset') !== -1) {
  fs.unlinkSync(path.join(data_path, 'data/bookmarks.db'), function (err) {
    if (err) {
    }
  });
  fs.unlinkSync(path.join(data_path, 'data/shows.db'), function (err) {
  });
  fs.unlinkSync(path.join(data_path, 'data/settings.db'), function (err) {
    if (err) {
    }
  });
}
var App = new Marionette.Application({
  region: '.main-window-region'
});
_.extend(App, {
  Controller: {},
  View: {},
  Model: {},
  Page: {},
  Scrapers: {},
  Providers: {},
  Localization: {}
});
App.vent = Backbone.Radio.channel('v2-vent');

App.db = Database;

App.advsettings = AdvSettings;
App.settings = Settings;
App.WebTorrent = new WebTorrent({
  maxConns: parseInt(Settings.connectionLimit, 10) || 55,
  tracker: {
     announce: Settings.trackers.forced
  },
  dht: true
});
App.plugins = {};
fs.readFile('./.git.json', 'utf8', function (err, json) {
  if (!err) {
    App.git = JSON.parse(json);
  }
});
if (os.platform() === 'darwin') {
  var nativeMenuBar = new nw.Menu({
  });
  win.menu = nativeMenuBar;
}
App.ViewStack = [];
App.onBeforeStart = function (options) {
  // this is the 'do things with resolutions and size initializer
  var zoom = 0;
  var screen = window.screen;
  var height = parseInt(
  );
  var y = parseInt(localStorage.posY ? localStorage.posY : -1);
  if (screen.availHeight < height) {
    height = screen.availHeight;
  }
  if (y < 0 || y + height > screen.height) {
    y = Math.round((screen.availHeight - height) / 2);
  }
  win.zoomLevel = zoom;
};
var initTemplates = function () {
  // Load in external templates
  var ts = [];

  _.each(document.querySelectorAll('[type="text/x-template"]'), function (el) {
    var d = Q.defer();
    $.get(el.src, function (res) {
      el.innerHTML = res;
    });
    ts.push(d.promise);
  });

};
var initApp = function () {
  var mainWindow = new App.View.MainWindow();
  } catch (e) {
  }
};
App.onStart = function (options) {
  initTemplates().then(initApp);
};
var deleteFolder = function (folderPath) {
  if (typeof folderPath !== 'string') {
  }

  var files = [];
  if (fs.existsSync(folderPath)) {
    files = fs.readdirSync(folderPath);
    files.forEach(function (file) {
      var curPath = path.join(folderPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        deleteFolder(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
  }
};
var deleteCookies = function () {
  function removeCookie(cookie) {
    win.cookies.remove(
      function (result) {
        if (result) {
          if (!result.name) {
            result = result[0];
          }
          win.debug('cookie removed: ' + result.name + ' ' + result.url);
        } else {
          win.error('cookie removal failed');
        }
      }
    );
  }
};
var deleteCache = function () {
};
var deleteLogs = function() {
  var dataPath = path.join(data_path, 'logs.txt');
  if (fs.existsSync(dataPath)) {
  }
};
win.on('resize', function (width, height) {
  localStorage.width = Math.round(width);
  localStorage.height = Math.round(height);
});
win.on('move', function (x, y) {
  localStorage.posX = Math.round(x);
  localStorage.posY = Math.round(y);
});
win.on('maximize', function () {
  localStorage.maximized = true;
});
win.on('restore', function () {
  localStorage.maximized = false;
});
function close() {
  $('.spinner').show();
  // Try to let the WebTorrent destroy from that closure. Even if it fails, the window will close.
  if (App.WebTorrent.destroyed) {
  }
}
String.prototype.capitalize = function () {
};
String.prototype.capitalizeEach = function () {
  return this.replace(/\w*/g, function (txt) {
  });
};
String.prototype.endsWith = function (suffix) {
};
Mousetrap.bindGlobal(['alt+f4', 'command+q'], function (e) {
  close();
});
Mousetrap.bindGlobal(['shift+f12', 'f12', 'command+0'], function (e) {
});
Mousetrap.bindGlobal(['shift+f10', 'f10', 'command+9'], function (e) {
  App.settings.os === 'windows' ? nw.Shell.openExternal(App.settings.tmpLocation) : nw.Shell.openItem(App.settings.tmpLocation);
});
