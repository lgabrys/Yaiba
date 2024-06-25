    http = require('http'),
    argv = require('optimist').argv;
var port = argv.p || argv.port || 8080;
console.log('> hello world running on port ' + port);
