
/**
 * Module dependencies.
 */

var debug = require('debug')('superagent');
var formidable = require('formidable');
var FormData = require('form-data');
var Response = require('./response');
var format = require('url').format;
var resolve = require('url').resolve;
var Stream = require('stream');
var utils = require('./utils');
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
  var self = this;
  this.end().req.on('response', function(res){
    var redirect = isRedirect(res.statusCode);
    if (redirect && self._redirects++ != self._maxRedirects) {
    }
  });
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
  var url = res.headers.location;
  url = resolve(this.url, url);
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
  var self = this;
  var req = this.request();
  var buffer = this._buffer;
  try {
    var querystring = qs.stringify(this.qs, { indices: false });
    querystring += ((querystring.length && this.qsRaw.length) ? '&' : '') + this.qsRaw.join('&');
    req.path += querystring.length
  } catch (e) {
  req.on('response', function(res){
    var max = self._maxRedirects;
    var mime = utils.type(res.headers['content-type'] || '') || 'text/plain';
    var type = mime.split('/');
    var type = type[0];
    var multipart = 'multipart' == type;
    var redirect = isRedirect(res.statusCode);
    var parser = self._parser;
    self.res = res;
    if ('HEAD' == self.method) {
      var response = new Response(self);
      self.response = response;
      response.redirects = self._redirectList;
    }
    if (redirect && self._redirects++ != max) {
    }
    if (multipart) buffer = false;
    if (!parser && multipart) {
      var form = new formidable.IncomingForm;
      form.parse(res, function(err, fields, files){
        var response = new Response(self);
        self.response = response;
        response.body = fields;
        response.files = files;
        response.redirects = self._redirectList;
      });
    }
    if (!parser && isImage(mime)) {
      exports.parse.image(res, function(err, obj){
        var response = new Response(self);
        self.response = response;
        response.body = obj;
        response.redirects = self._redirectList;
      });
    }
    if (null == buffer && isText(mime) || isJSON(mime)) buffer = true;
    var parse = 'text' == type
    if (!parse && isJSON(mime)) parse = exports.parse['application/json'];
    if (buffer) parse = parse || exports.parse.text;
    if (parser) parse = parser;
    if (parse) {
      try {
        parse(res, function(err, obj){
          if (err) self.callback(err);
        });
      } catch (err) {
    }
  });
};
