var fs = require('fs'),
    path = require('path'),
    exists = fs.exists || path.exists,
    utils = require('../utils'),
    exec = require('./exec'),
    defaults = require('./defaults');
function load(settings, options, config, callback) {
  config.loaded = [];
  loadFile(options, config, utils.home, function (options) {
    // then load the user's local nodemon.json
    loadFile(options, config, process.cwd(), function (options) {
      // Then merge over with the user settings (parsed from the cli).
      // Note that merge protects and favours existing values over new values,
      // and thus command line arguments get priority
      options = utils.merge(settings, options);
      options = utils.merge(options, defaults);
      options.execOptions = exec({
      }, options.execMap);
      options.ext = options.execOptions.ext.replace(/[\*\.\$]/g, '').split('|').join(' ');
      if (options.verbose) {
        utils.debug = true;
      }
      if (config.loaded.length === 0 && options.ignore.length === 0) {
      }
    });
  });
}
