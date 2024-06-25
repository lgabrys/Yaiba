var events = require('events'),
    util = require('util'),
    config = require('./config'),
//
//
// ### function Logger (options)
// #### @options {Object} Options for this instance.
// Constructor function for the Logger object responsible
var Logger = exports.Logger = function (options) {
  options = options || {};
  this.rewriters         = [];
  if (options.transports) {
    options.transports.forEach(function (transport) {
    });
  }
};
Logger.prototype.extend = function (target) {
  var self = this;
  ['log', 'profile', 'startTimer'].concat(Object.keys(this.levels)).forEach(function (method) {
    target[method] = function () {
    };
  });
};
Logger.prototype.log = function (level, msg) {
  var self = this,
      callback,
      meta;
  if (arguments.length === 3) {
    if (typeof arguments[2] === 'function') {
      meta = {};
      callback = arguments[2];
    }
    else if (typeof arguments[2] === 'object') {
      meta = arguments[2];
    }
  }
  else if (arguments.length === 4) {
    meta = arguments[2];
    callback = arguments[3];
  }
  if (this.padLevels) {
    msg = new Array(this.levelLength - level.length).join(' ') + msg;
  }
};
