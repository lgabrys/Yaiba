var fs = require('fs'),
    path = require('path'),
    exists = fs.exists || path.exists,
    utils = require('../utils'),
    exec = require('./exec'),
    defaults = require('./defaults');
function load(settings, options, config, callback) {
  config.loaded = [];
  loadFile(options, config, utils.home, function (options) {
    loadFile(options, config, process.cwd(), function (options) {
      options = utils.merge(settings, options);
      options = utils.merge(options, defaults);
      options.execOptions = exec({
      }, options.execMap);
      options.ext = options.execOptions.ext.replace(/[\*\.\$]/g, '').split('|').join(' ');
      if (options.verbose) {
        utils.debug = true;
      }
      if (config.loaded.length === 0) {
      }
    });
  });
}
