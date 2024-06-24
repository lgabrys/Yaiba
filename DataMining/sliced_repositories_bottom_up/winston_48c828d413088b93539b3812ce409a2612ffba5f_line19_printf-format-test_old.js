
var assert = require('assert'),
    vows = require('vows'),
    winston = require('../lib/winston'),
    util = require('util'),
    helpers = require('./helpers');

vows.describe('winston/logger/levels').addBatch({
  "The winston logger": {
    topic: winston.createLogger({
      transports: [
        new (winston.transports.Console)()
      ]
    }),
    "the log() method": {
      "when passed undefined should not throw": function (logger) {
        assert.doesNotThrow(function () { logger.log('info', undefined) });
      },
    }
  }
}).export(module);
