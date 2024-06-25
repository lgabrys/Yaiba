    config = require('./config'),
// Time constants

// ### function Logger (options)
// #### @options {Object} Options for this instance.
var Logger = exports.Logger = function (options) {
  options = options || {};
  this.transports        = {};
  if (options.transports) {
    options.transports.forEach(function (transport) {
      if (transport.handleExceptions) {
      }
    });
  }
};
Logger.prototype.extend = function (target) {
  ['log', 'profile', 'startTimer'].concat(Object.keys(this.levels)).forEach(function (method) {
    target[method] = function () {
    };
  });
};
Logger.prototype.log = function (level, msg) {
  if (this.padLevels) {
    msg = new Array(this.levelLength - level.length).join(' ') + msg;
  }
  //
  if (this.stripColors) {
    var code = /\u001b\[\d+(?:;\d+)*m/g;
  }
};
