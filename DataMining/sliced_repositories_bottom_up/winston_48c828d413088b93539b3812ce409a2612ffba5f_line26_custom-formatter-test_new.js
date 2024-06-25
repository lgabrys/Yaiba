    events = require('events'),
    fs = require('fs'),
    path = require('path'),
    vows = require('vows'),
    winston = require('../lib/winston'),
    helpers = require('./helpers');
function assertFileFormatter (basename, options) {
  var filename = path.join(__dirname, 'fixtures', 'logs', basename + '.log');
  return {
    topic: function () {
      options.filename = filename;
      var transport = new winston.transports.File(options);
    },
  }
}
