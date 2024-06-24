    cli = require('./cli'),
    utils = require('./utils'),
    bus = utils.bus,
    config = require('./config'),
    eventHandlers = {};
config.required = utils.isRequired;
function nodemon(settings) {
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
    if (!config.options.script) {
    }
  });
}
