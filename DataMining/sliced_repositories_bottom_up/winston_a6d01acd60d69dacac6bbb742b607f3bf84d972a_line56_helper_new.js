
var fs = require('fs'),
    util = require('util'),
    path = require('path'),
    vows = require('vows'),
    assert = require('assert'),
    winston = require('winston');
var helpers = exports;
helpers.loadConfig = function () {
  try {
    var configFile = path.join(__dirname, 'data', 'test-config.json'),
        stats = fs.statSync(configFile)
        config = JSON.parse(fs.readFileSync(configFile).toString());
    helpers.config = config;
  }
};
helpers.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
};
helpers.assertLogger = function (logger) {
  assert.instanceOf(logger, winston.Logger);
  assert.equal(logger.level, "info");
};
