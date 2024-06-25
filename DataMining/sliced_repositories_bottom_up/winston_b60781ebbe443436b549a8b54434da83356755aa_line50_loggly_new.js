    loggly = require('loggly'),
    util = require('util'),
    async = require('async'),
    Transport = require('./transport').Transport;
// #### @options {Object} Options for this instance.
//
var Loggly = exports.Loggly = function (options) {
  Transport.call(this, options);
  if (!options.subdomain) {
  }
  else if (options.inputName && options.inputs && options.inputs[options.inputName]) {
  }
};
