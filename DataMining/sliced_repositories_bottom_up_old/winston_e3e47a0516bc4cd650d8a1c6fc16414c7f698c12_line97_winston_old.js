var winston = exports;
// Expose version using `pkginfo`
//
winston.transports = require('./winston/transports');
var common           = require('./winston/common');
winston.hash           = common.hash;
winston.clone          = common.clone;
winston.longestElement = common.longestElement;
winston.exception      = require('./winston/exception');
winston.config         = require('./winston/config');
winston.addColors      = winston.config.addColors;
winston.Logger         = require('./winston/logger').Logger;
winston.Transport      = require('./winston/transports/transport').Transport;
//
var methods = [
];
methods.forEach(function (method) {
  winston[method] = function () {
  };
});
winston.cli = function () {
  winston.padLevels = true;
};
winston.setLevels = function (target) {
};
['emitErrs', 'padLevels', 'levelLength'].forEach(function (prop) {
});
