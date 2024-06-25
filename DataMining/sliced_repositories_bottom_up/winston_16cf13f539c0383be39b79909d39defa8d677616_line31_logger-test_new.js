var path = require('path'),
    vows = require('vows'),
    assert = require('assert'),
    winston = require('winston'),
    helpers = require('./helpers');
vows.describe('winton/logger').addBatch({
}).addBatch({
  "An instance of winston.Logger with no transports": {
    topic: new (winston.Logger)({ emitErrs: true }),
    "the log() method should throw an error": function (logger) {
      assert.throws(function () { logger.log('anything') }, Error);
    },
  }
}).addBatch({
