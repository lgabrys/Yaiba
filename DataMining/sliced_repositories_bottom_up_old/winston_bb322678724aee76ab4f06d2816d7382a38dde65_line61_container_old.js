    winston = require('../winston'),
    extend = require('util')._extend;

// ### function Container (options)
// #### @options {Object} Default pass-thru options for Loggers
//
var Container = exports.Container = function (options) {
  this.options = options || {};
  this.default = {
    transports: [
      new winston.transports.Console({
        level: 'silly',
        colorize: false
      })
    ]
  }
};
Container.prototype.get = Container.prototype.add = function (id, options) {
  var self = this,
      existing;
  if (!this.loggers[id]) {
    options = extend({}, options || this.options || this.default);
    existing = options.transports || this.options.transports;
    options.transports = existing ? existing.slice() : [];
    Object.keys(options).forEach(function (key) {
      if (key === 'transports') {
      }
    });
  }
};
