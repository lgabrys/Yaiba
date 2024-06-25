/**
 * Module dependencies.
 */
const FormData = require('form-data');
const Response = require('./response');
const parse = require('url').parse;
const format = require('url').format;
const resolve = require('url').resolve;
const Stream = require('stream');
const extend = require('extend');
const mime = require('mime');
const https = require('https');
const http = require('http');
const fs = require('fs');
const qs = require('qs');
const util = require('util');
const pkg = require('../../package.json');
const RequestBase = require('../request-base');
function request(method, url) {
  // callback
}
exports = module.exports = request;
exports.Request = Request;
exports.agent = require('./agent');
function noop(){};
exports.Response = Response;
exports.protocols = {
};
exports.serialize = {
};
exports.parse = require('./parsers');
exports.buffer = {};
function _initHeaders(req) {
  const ua = `node-superagent/${pkg.version}`;
  req._header = { // coerces header names to lowercase
  };
  req.header = { // preserves header name case
  };
}
function Request(method, url) {
  if ('string' != typeof url) url = format(url);
}
Request.prototype.attach = function(field, file, options){
  if (file) {
    let o = options || {};
    if ('string' == typeof options) {
      o = { filename: options };
    }
    if ('string' == typeof file) {
      if (!o.filename) o.filename = file;
      file = fs.createReadStream(file);
    } else if (!o.filename && file.path) {
      o.filename = file.path;
    }
  }
};
Request.prototype._getFormData = function() {
};
Request.prototype.agent = function(agent){
};
Request.prototype.type = function(type) {
};
Request.prototype.accept = function(type){
};
Request.prototype.query = function(val){
};
Request.prototype.write = function(data, encoding){
  const req = this.request();
};
Request.prototype.pipe = function(stream, options){
};
Request.prototype._pipeContinue = function(stream, options){
  this.req.once('response', res => {
  });
};
Request.prototype.buffer = function(val){
};
Request.prototype._redirect = function(res){
  let url = res.headers.location;
  url = resolve(this.url, url);
};
Request.prototype.auth = function(user, pass, options){
  if (1 === arguments.length) pass = '';
  if (typeof pass === 'object' && pass !== null) { // pass is optional and can be replaced with options
    options = pass;
    pass = '';
  }
  if (!options) {
    options = { type: 'basic' };
  }
};
Request.prototype.ca = function(cert){
};
Request.prototype.key = function(cert){
};
Request.prototype.pfx = function(cert) {
};
Request.prototype.cert = function(cert){
};
Request.prototype.request = function(){
  const options = {};
  let url = this.url;
  let queryStringBackticks;
  if(url.indexOf('`') > -1) {
    const queryStartIndex = url.indexOf("?");
    if(queryStartIndex !== -1) {
      const queryString = url.substr(queryStartIndex + 1);
      queryStringBackticks = queryString.match(/`|\%60/g);
    }
  }
  if (0 != url.indexOf('http')) url = `http://${url}`;
  url = parse(url);
  if(queryStringBackticks) {
    let i = 0;
    url.query = url.query.replace(/\%60/g, () => queryStringBackticks[i++]);
    url.search = '?' + url.query;
    url.path = url.pathname + url.search;
  }
  if (/^https?\+unix:/.test(url.protocol) === true) {
    url.protocol = `${url.protocol.split('+')[0]}:`;
    const unixParts = url.path.match(/^([^/]+)(.+)$/);
    options.socketPath = unixParts[1].replace(/%2F/g, '/');
    url.path = unixParts[2];
  }
  options.method = this.method;
  options.port = url.port;
  options.path = url.path;
  options.host = url.hostname;
  options.ca = this._ca;
  options.key = this._key;
  options.pfx = this._pfx;
  options.cert = this._cert;
  options.passphrase = this._passphrase;
  options.agent = this._agent;
  if (this._header['host']) {
    options.servername = this._header['host'].replace(/:[0-9]+$/,'');
  }
  const mod = exports.protocols[url.protocol];
  const req = (this.req = mod.request(options));
  req.once('error', err => {
  });
};
