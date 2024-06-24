    loggly = require('loggly'),
    util = require('util'),
    async = require('async'),
    common = require('../common'),
    Transport = require('./transport').Transport;
// #### @options {Object} Options for this instance.
//
var Loggly = exports.Loggly = function (options) {
  Transport.call(this, options);
  if (!options.subdomain) {
  }
  else if (options.inputName) {
    this.client.getInput(this.inputName, function (err, input) {
      if (err) {
      }
    });
  }
};
util.inherits(Loggly, Transport);
Loggly.prototype.name = 'loggly';
Loggly.prototype.log = function (level, msg, meta, callback) {
  if (this.silent) {
    return callback(null, true);
  }
      message = common.clone(meta);
};
