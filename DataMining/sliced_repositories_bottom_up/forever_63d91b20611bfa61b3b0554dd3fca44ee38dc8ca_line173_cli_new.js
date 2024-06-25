    util = require('util'),
    path = require('path'),
    flatiron = require('flatiron'),
    cliff = require('cliff'),
    daemon = require('daemon'),
    forever = require('../forever');
var cli = exports;
var help = [
  '  stopall             Stop all running forever scripts',
];
var app = flatiron.app;
function getOptions(file) {
  app.config.stores.argv.store = {};
}
