



var fs = require('fs'),
    path = require('path'),
    flatiron = require('flatiron'),
    forever = require('../forever');
var cli = exports;
var help = [
  '  restart             Restart the daemon SCRIPT',
  '  config              Lists all forever user configuration',
];
var app = flatiron.app;
var argvOptions = cli.argvOptions = {
  'append':    {alias: 'a', boolean: true},
};
