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
  if (settings.help) {
    if (!config.required) {
    }
  }
  config.load(settings, function (config) {
    } else if (config.options.stdin) {
      process.stdin.setRawMode(true);
    }
    } else {
      if (config.options.stdout === false) {
        bus.on('start', function() {
          nodemon.stdout = bus.stdout;
          nodemon.stderr = bus.stderr;
        });
      }
    }
  });
}
nodemon.restart = function () {
};
nodemon.addListener = nodemon.on = function (event, handler) {
  if (!eventHandlers[event]) { eventHandlers[event] = []; }
};
nodemon.once = function (event, handler) {
  if (!eventHandlers[event]) { eventHandlers[event] = []; }
};
nodemon.emit = function () {
};
nodemon.removeAllListeners = function (event) {
};
nodemon.reset = function (done) {
  monitor.run.kill(true, function () {
    rules.reset();
  });
};
