
var loggly = require('loggly')
    utils = require('./utils');
var Loggly = exports.Loggly = function (options) {
  if (!options.auth)       throw new Error('Loggly authentication is required');
  if (!options.subdomain)  throw new Error('Loggly Subdomain is required');
  this.client = new (loggly.Loggly)({
    subdomain: options.subdomain,
  });
};
