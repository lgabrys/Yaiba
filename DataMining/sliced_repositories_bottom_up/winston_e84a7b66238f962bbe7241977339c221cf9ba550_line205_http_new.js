const util = require('util');
const http = require('http');
const https = require('https');
const TransportStream = require('winston-transport');
//
// for persisting log messages and metadata to a terminal or TTY.
//
var Http = module.exports = function (options) {
  options = options || {};

  this.ssl = !!options.ssl;
  if (!this.port) {
    this.port = this.ssl ? 443 : 80;
  }
};
Http.prototype.name = 'http';
Http.prototype.log = function (info, callback) {
  var self = this;
  this._request(info, function (err, res) {
    if (res && res.statusCode !== 200) {
      err = new Error('Invalid HTTP Status Code: ' + res.statusCode);
    }
  });
};
Http.prototype.query = function (options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = this.normalizeQuery(options);
  options = {
  };
  if (options.params.path) {
    options.path = options.params.path;
  }
  if (options.params.auth) {
    options.auth = options.params.auth;
  }
};
Http.prototype.stream = function (options) {
  options = options || {};
  options = {
  };
  if (options.params.path) {
    options.path = options.params.path;
  }
  if (options.params.auth) {
    options.auth = options.params.auth;
  }
};
Http.prototype._request = function (options, callback) {
  options = options || {};
  const auth = options.auth || this.auth;
  const path = options.path || this.path || '';
  const req = (this.ssl ? https : http).request({
    method: 'POST',
    host: this.host,
    port: this.port,
    path: '/' + path.replace(/^\//, ''),
    headers: this.headers,
    auth: auth ? (auth.username + ':' + auth.password) : '',
    agent: this.agent
  });
  req.end(Buffer.from(JSON.stringify(options), 'utf8'));
};
