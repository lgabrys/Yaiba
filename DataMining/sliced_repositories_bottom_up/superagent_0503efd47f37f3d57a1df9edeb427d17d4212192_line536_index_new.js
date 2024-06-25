/*!
 * superagent
 * Copyright (c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
var Stream = require('stream').Stream
  , formidable = require('formidable')
  , Response = require('./response')
  , parse = require('url').parse
  , format = require('url').format
  , methods = require('methods')
  , utils = require('./utils')
  , Part = require('./part')
  , mime = require('mime')
  , https = require('https')
  , http = require('http')
  , fs = require('fs')
  , qs = require('qs');
exports = module.exports = request;
exports.Part = Part;
exports.Response = Response;
exports.protocols = {
};
exports.serialize = {
};
exports.parse = require('./parsers');
function Request(method, url) {
  if ('string' != typeof url) url = format(url);
}
Request.prototype.__proto__ = Stream.prototype;
Request.prototype.attach = function(file, filename){
};
Request.prototype.redirects = function(n){
};
Request.prototype.part = function(){
};
Request.prototype.set = function(field, val){
};
Request.prototype.get = function(field){
};
Request.prototype.type = function(type){
};
Request.prototype.query = function(obj){
};
Request.prototype.send = function(data){
};
Request.prototype.write = function(data, encoding){
};
Request.prototype.pipe = function(stream, options){
};
Request.prototype.preventBuffer = function(){
};
Request.prototype.redirect = function(res){
};
Request.prototype.auth = function(user, pass){
};
Request.prototype.field = function(name, val){
};
Request.prototype.request = function(){
};
Request.prototype.callback = function(err, res){
};
Request.prototype.end = function(fn){
  var self = this
    , data = this._data
    , req = this.request()
    , buffer = this._buffer
    , method = this.method;
  switch (method) {
      var serialize = exports.serialize[req.getHeader('Content-Type')];
      if (serialize) data = serialize(data);
  }
  req.on('response', function(res){
    var max = self._maxRedirects
      , redirect = isRedirect(res.statusCode);
    if (redirect && self._redirects++ != max) {
    }
    if (/^(deflate|gzip)$/.test(res.headers['content-encoding'])) {
      utils.unzip(req, res);
    }
  });
};
