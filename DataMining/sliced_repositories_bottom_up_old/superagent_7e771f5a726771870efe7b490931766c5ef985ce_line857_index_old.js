
/**
 * Module dependencies.
 */
var FormData = require('form-data');
var Response = require('./response');
var format = require('url').format;
var Stream = require('stream');
var extend = require('extend');
var Part = require('./part');
var fs = require('fs');
var qs = require('qs');
var util = require('util');
exports = module.exports = request;
exports.agent = require('./agent');
exports.Part = Part;
exports.Response = Response;
exports.protocols = {
};
function isObject(obj) {
}
exports.serialize = {
};
exports.parse = require('./parsers');
function Request(method, url) {
  var self = this;
  if ('string' != typeof url) url = format(url);
  this._agent = false;
  this._formData = null;
  this.method = method;
  this.url = url;
  this.header = {};
}
Request.prototype.field = function(name, val){
};
Request.prototype.attach = function(field, file, filename){
  if ('string' == typeof file) {
    if (!filename) filename = file;
    file = fs.createReadStream(file);
  }
};
Request.prototype.redirects = function(n){
};
Request.prototype.part = util.deprecate(function(){
   'Pass a readable stream in to `Request#attach()` instead.');
Request.prototype.agent = function(agent){
};
Request.prototype.set = function(field, val){
};
Request.prototype.unset = function(field){
};
Request.prototype.get = function(field){
};
Request.prototype.type = function(type){
};
Request.prototype.accept = function(type){
};
Request.prototype.query = function(val){
};
Request.prototype.send = function(data){
};
Request.prototype.write = function(data, encoding){
};
Request.prototype.pipe = function(stream, options){
};
Request.prototype.buffer = function(val){
};
Request.prototype.timeout = function(ms){
};
Request.prototype.clearTimeout = function(){
};
Request.prototype.abort = function(){
};
Request.prototype.parse = function(fn){
};
Request.prototype.redirect = function(res){
};
Request.prototype.auth = function(user, pass){
  if (1 === arguments.length) pass = '';
  if (!~user.indexOf(':')) user = user + ':';
};
Request.prototype.ca = function(cert){
};
Request.prototype.use = function(fn) {
};
Request.prototype.request = function(){
};
Request.prototype.callback = function(err, res){
  if (err) {
    err.response = res;
  }
};
Request.prototype.end = function(fn){
  var data = this._data;
  var req = this.request();
  var method = this.method;
  try {
    var querystring = qs.stringify(this.qs, { indices: false });
    querystring += ((querystring.length && this.qsRaw.length) ? '&' : '') + this.qsRaw.join('&');
    req.path += querystring.length
  } catch (e) {
  if ('HEAD' != method && !req._headerSent) {
    if ('string' != typeof data) {
      var contentType = req.getHeader('Content-Type')
      if (contentType) contentType = contentType.split(';')[0]
      var serialize = exports.serialize[contentType];
      if (serialize) data = serialize(data);
    }
    if (data && !req.getHeader('Content-Length')) {
      this.set('Content-Length', Buffer.byteLength(data));
    }
  }
};
