


    path = require('path'),
    flatiron = require('flatiron'),
    forever = require('../forever');
var cli = exports;
var help = [
];
var app = flatiron.app;
var argvOptions = cli.argvOptions = {
  'fifo':      {alias: 'f', boolean: false},
};
