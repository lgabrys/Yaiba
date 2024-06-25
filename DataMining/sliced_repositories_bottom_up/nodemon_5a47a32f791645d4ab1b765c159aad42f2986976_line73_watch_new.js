var chokidar = require('chokidar');
var config = require('../config');
var utils = require('../utils');
var match = require('./match');
function watch() {
  const promise = new Promise(function (resolve) {
    var ignored = match.rulesToMonitor(
      [], // not needed
    ).map(pattern => pattern.slice(1));
    var watchOptions = {
      ignorePermissionErrors: true,
      ignored: ignored,
      persistent: true,
      usePolling: config.options.legacyWatch || false,
      interval: config.options.pollingInterval,
    };
    if (utils.isWindows) {
      watchOptions.disableGlobbing = true;
    }
    if (process.env.TEST) {
      watchOptions.useFsEvents = false;
    }
    var watcher = chokidar.watch(
      Object.assign({}, watchOptions, config.options.watchOptions || {})
    );
  });
}
