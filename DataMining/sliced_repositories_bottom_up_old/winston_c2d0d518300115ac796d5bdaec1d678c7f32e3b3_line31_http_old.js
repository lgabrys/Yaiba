var util = require('util'),
    winston = require('../../winston'),
    http = require('http'),
    https = require('https'),
    Stream = require('stream').Stream,
    Transport = require('./transport');

//
// #### @options {Object} Options for this instance.
// for persisting log messages and metadata to a terminal or TTY.
var Http = module.exports = function (options) {
  Transport.call(this, options);
  options = options || {};
  this.name = 'http';
  this.port = options.port;
  if (!this.port) {
    this.port = this.ssl ? 443 : 80;
  }
};
util.inherits(Http, winston.Transport);
