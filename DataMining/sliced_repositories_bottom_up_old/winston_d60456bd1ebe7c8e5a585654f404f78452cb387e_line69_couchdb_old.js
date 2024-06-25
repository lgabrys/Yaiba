    http = require('http'),
    util = require('util'),
    common = require('../common'),
    Transport = require('./transport').Transport;
// Constructor function for the Console transport object responsible
//
var Couchdb = exports.Couchdb = function (options) {
  Transport.call(this, options);
  this.user   = options.user;
};
Couchdb.prototype.name = 'Couchdb';
// ### function log (level, msg, [meta], callback)
Couchdb.prototype.log = function (level, msg, meta, callback) {
  if (this.silent) {
    return callback(null, true);
  }
      message = common.clone(meta),
};
