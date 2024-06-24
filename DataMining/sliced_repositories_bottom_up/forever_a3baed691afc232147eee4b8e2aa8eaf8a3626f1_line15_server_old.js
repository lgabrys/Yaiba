var util = require('util'),
    http = require('http'),
    argv = require('optimist').argv;
var port = argv.p || argv.port || 8080;
util.puts('> hello world running on port ' + port);
