module.exports = watch;

var debug = require('debug')('nodemon');
var chokidar = require('chokidar');
var undefsafe = require('undefsafe');
var config = require('../config');
var path = require('path');
var utils = require('../utils');
var bus = utils.bus;
var match = require('./match');
var watchers = [];
var debouncedBus;

bus.on('reset', function () {
  debug('resetting watchers');
  watchers.forEach(function (watcher) {
    watcher.close();
  });
  watchers = [];
});

function watch() {
  if (watchers.length) {
    debug('early exit on watch, still watching (%s)', watchers.length);
    return;
  }

  var dirs = [].slice.call(config.dirs);

  debug('start watch on: %s', dirs.join(', '));

  dirs.forEach(function (dir) {
    var watcher = chokidar.watch(dir, {
      // ignore our files, but also ignore dotfiles
      ignored: [config.options.ignore.re, /[\/\\]\./],
      persistent: true,
    });


    watcher.on('change', filterAndRestart);
    watcher.on('addDir', function (arg) {
      debug('watching dir: %s', arg);
    });
    watchers.push(watcher);
  });
}

function filterAndRestart(files) {
  if (!Array.isArray(files)) {
    files = [files];
  }
  if (files.length) {
    if (utils.isWindows) {
      // ensure the drive letter is in uppercase (c:\foo -> C:\foo)
      files = files.map(function (f) {
        return f[0].toUpperCase() + f.slice(1);
      });
    }

    var cwd = process.cwd();
    utils.log.detail('files triggering change check: ' +
      files.map(function (file) {
        return path.relative(cwd, file);
      }).join(', '));

    var matched = match(
      files,
      config.options.monitor,
      undefsafe(config, 'options.execOptions.ext')
    );

    utils.log.detail('changes after filters (before/after): ' +
      [files.length, matched.result.length].join('/'));

    // reset the last check so we're only looking at recently modified files
    config.lastStarted = Date.now();

    if (matched.result.length) {
      if (config.options.delay > 0) {
        utils.log.detail('delaying restart for ' + config.options.delay + 'ms');
        if (debouncedBus === undefined) {
          debouncedBus = debounce(restartBus, config.options.delay);
        }
        debouncedBus(matched);
      } else {
        return restartBus(matched);
      }
    }
  }
}


function restartBus(matched) {
  utils.log.status('restarting due to changes...');
  matched.result.map(function (file) {
    utils.log.detail(path.relative(process.cwd(), file));
  });

  if (config.options.verbose) {
    utils.log._log('');
  }

  bus.emit('restart', matched.result);
}

function debounce(fn, delay) {
  var timer = null;
  return function () {
    var context = this;
    var args = arguments;
    clearTimeout(timer);
    timer = setTimeout(function () {
      fn.apply(context, args);
    }, delay);
  };
}
