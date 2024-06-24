    util = require('util'),
// #### @options {Object} Options for this instance.
// are received.
//
var Webhook = exports.Webhook = function (options) {
  this.host   = options.host   || 'localhost';
};
Webhook.prototype.name = 'webhook';
//
Webhook.prototype.log = function (level, msg, meta, callback) {
  var self = this,
  if (self.ssl) {
  }
};
