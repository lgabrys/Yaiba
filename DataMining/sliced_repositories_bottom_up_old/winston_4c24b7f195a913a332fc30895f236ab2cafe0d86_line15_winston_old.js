
var winston = exports;
winston.default    = {};
winston.Logger     = require('./winston/logger').Logger;
winston.Transports = require('./winston/transports');

var defaultLogger = new (winston.Logger)()

winston.add = function (transport, options) {

};
