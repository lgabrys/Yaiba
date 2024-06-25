    util = require('util'),
    common = require('../common'),
    Transport = require('./transport').Transport,
    Stream = require('stream').Stream,
// ### function Couchdb (options)
// for making arbitrary HTTP requests whenever log messages and metadata
// are received.
//
var Couchdb = exports.Couchdb = function (options) {
  this.name   = 'Couchdb';
};
Couchdb.prototype.name = 'Couchdb';
Couchdb.prototype.log = function (level, msg, meta, callback) {
  if (this.silent) {
  }
  //
};
Couchdb.prototype._request = function(opt, callback) {
  if (opt.path) {
    opt.url = 'http://'
  }
};
Couchdb.prototype.query = function (options, callback) {
  var req = this._request({
    method: options.method || 'GET',
    path: options.view || options.path,
    json: options.body || {}
  });
};
