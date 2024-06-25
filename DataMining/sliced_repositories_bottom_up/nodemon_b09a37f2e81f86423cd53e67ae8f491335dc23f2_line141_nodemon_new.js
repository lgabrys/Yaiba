    monitor = require('./monitor'),
    cli = require('./cli'),
    version = require('./version'),
    util = require('util'),
    utils = require('./utils'),
    rules = require('./rules'),
    bus = utils.bus,
    help = require('./help'),
    config = require('./config'),
    eventHandlers = {};
config.required = utils.isRequired;
function nodemon(settings) {
  nodemon.reset();
  if (typeof settings === 'string') {
    settings = settings.trim();
    if (settings.indexOf('node') !== 0) {
      if (settings.indexOf('nodemon') !== 0) {
        settings = 'nodemon ' + settings;
      }
      settings = 'node ' + settings;
    }
    settings = cli.parse(settings);
  }
  if (settings.verbose) {
    utils.debug = true;
  }
  config.load(settings, function (config) {
    utils.log.detail('watching extensions: ' + config.options.execOptions.ext);
  });
}
