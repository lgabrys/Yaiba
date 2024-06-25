var monitor = require('./monitor'),
    version = require('./version'),
    utils = require('./utils'),
    help = require('./help'),
    path = require('path'),
    config = require('./config');
var nodemon = function (settings) {
  if (settings.verbose) {
    utils.debug = true;
  }

  if (settings.version) {
  }

  config.load(settings, function (config) {
    config.dirs.forEach(function (dir) {
      utils.log.info('watching: ' + dir);
    });
    monitor.run(config.options.exec, [config.options.userScript].concat(config.options.args), config.options);
  });
}
