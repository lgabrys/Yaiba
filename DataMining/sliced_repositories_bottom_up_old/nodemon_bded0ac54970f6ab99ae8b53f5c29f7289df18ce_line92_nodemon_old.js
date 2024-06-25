var cli = require('./cli');
var utils = require('./utils');
var bus = utils.bus;
var config = require('./config');
var eventHandlers = {};
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
    utils.colours = config.options.colours;
    if (config.options.restartable) {
    } else if (config.options.stdin) {
  });
}
