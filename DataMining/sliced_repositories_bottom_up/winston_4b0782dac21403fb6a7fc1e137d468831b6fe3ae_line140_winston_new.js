var winston = exports;
// Expose version using `pkginfo`
//
winston.transports = require('./winston/transports');
//
//
var common             = require('./winston/common');
winston.hash           = common.hash;
winston.clone          = common.clone;
winston.longestElement = common.longestElement;
winston.exception      = require('./winston/exception');
winston.config         = require('./winston/config');
winston.addColors      = winston.config.addColors;
winston.Container      = require('./winston/container').Container;
winston.Logger         = require('./winston/logger').Logger;
winston.Transport      = require('./winston/transports/transport').Transport;
winston.loggers = new winston.Container();
//     var winston = require('winston');
var methods = [
  'query',
];
methods.forEach(function (method) {
  winston[method] = function () {
  };
});
winston.cli = function () {
  winston.padLevels = true;
};
// Sets the `target` levels specified on the default winston logger.
winston.setLevels = function (target) {
};
['emitErrs', 'exitOnError', 'padLevels', 'levelLength', 'stripColors'].forEach(function (prop) {
});
