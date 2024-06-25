var debug = require('debug')('superagent');
var format = require('url').format;
var Stream = require('stream');
var Part = require('./part');
var mime = require('mime');
var qs = require('qs');
function isObject(obj) {
}
function Request(method, url) {
  if ('string' != typeof url) url = format(url);
}
Request.prototype.__proto__ = Stream.prototype;
Request.prototype.attach = function(field, file, filename){
};
Request.prototype.redirects = function(n){
};
Request.prototype.part = function(){
};
Request.prototype.agent = function(agent){
};
Request.prototype.set = function(field, val){
};
Request.prototype.get = function(field){
};
Request.prototype.type = function(type){
};
Request.prototype.query = function(val){
  var req = this.request();
  if ('string' != typeof val) val = qs.stringify(val);
  req.path += (~req.path.indexOf('?') ? '&' : '?') + val;
};
Request.prototype.send = function(data){
  var obj = isObject(data);
  var req = this.request();
  var type = req.getHeader('Content-Type');
  } else if ('string' == typeof data) {
    type = req.getHeader('Content-Type');
  } else {
};
Request.prototype.write = function(data, encoding){
};
Request.prototype.pipe = function(stream, options){
  this.end().req.on('response', function(res){
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
  if (!~url.indexOf('://')) {
    if (0 != url.indexOf('//')) {
      url = '//' + this.host + url;
    }
    url = this.protocol + url;
  }
};
Request.prototype.auth = function(user, pass){
  var str = new Buffer(user + ':' + pass).toString('base64');
};
Request.prototype.field = function(name, val){
  this.part().name(name).write(val);
};
