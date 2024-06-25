    path = require('path'),
    changedSince = require('./changed-since'),
    utils = require('../utils'),
    bus = utils.bus,
    config = require('../config'),
    childProcess = require('child_process'),
    exec = childProcess.exec
    restartTimer = null,
    watched = [],
    watching = false;
bus.on('config:update', function () {
  if (config.system.noWatch) {
    changeFunction = function (lastStarted, callback) {
    };
  } else if (config.system.watchWorks) {
    changeFunction = function (lastStarted, callback) {
      function watch(err, dir) {
        try {
          if (watched.indexOf(dir) === -1 && ignoredFilter(dir)) {
          }
        } catch (e) {
      }
    };
  } else {
});
