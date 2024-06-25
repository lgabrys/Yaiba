/*!
 * superagent
 * Copyright (c) 2011 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */
var Stream = require('stream').Stream
  , Response = require('./response')
  , format = require('url').format
  , Part = require('./part')
  , http = require('http')
  , qs = require('qs');
exports = module.exports = request;
exports.version = '0.4.0';
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
  if ('string' != url) url = format(url);
  this.method = method;
  this.url = url;
  this.header = {};
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
Request.prototype.end = function(fn){
    , data = this._data
    , req = this.request()
    , method = this.method;
  switch (method) {
      var serialize = exports.serialize[req.getHeader('Content-Type')];
      if (serialize) data = serialize(data);
      if (data && !req.getHeader('Content-Length')) {
        this.set('Content-Length', data.length);
      }
  }
};
