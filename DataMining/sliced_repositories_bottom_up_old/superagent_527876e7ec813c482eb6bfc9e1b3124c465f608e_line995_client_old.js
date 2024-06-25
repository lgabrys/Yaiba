var Emitter = require('emitter');
function isHost(obj) {
}
request.getXHR = function () {
};
var trim = ''.trim
  ? function(s) { return s.trim(); }
  : function(s) { return s.replace(/(^\s*|\s*$)/g, ''); };
function isObject(obj) {
}
function serialize(obj) {
  var pairs = [];
  for (var key in obj) {
  }
}
 request.serializeObject = serialize;
function parseString(str) {
  var obj = {};
  var pairs = str.split('&');
  var parts;
  var pair;
  for (var i = 0, len = pairs.length; i < len; ++i) {
    pair = pairs[i];
    parts = pair.split('=');
    obj[decodeURIComponent(parts[0])] = decodeURIComponent(parts[1]);
  }
}
request.parseString = parseString;
request.types = {
  html: 'text/html',
  json: 'application/json',
  xml: 'application/xml',
  urlencoded: 'application/x-www-form-urlencoded',
};
 request.serialize = {
 };
request.parse = {
};
function parseHeader(str) {
  var lines = str.split(/\r?\n/);
  var fields = {};
  var index;
  var line;
  var field;
  var val;
  for (var i = 0, len = lines.length; i < len; ++i) {
    line = lines[i];
    index = line.indexOf(':');
    field = line.slice(0, index).toLowerCase();
    val = trim(line.slice(index + 1));
    fields[field] = val;
  }
}
function type(str){
};
function params(str){
};
function Response(req, options) {
  options = options || {};
}
Response.prototype.get = function(field){
};
Response.prototype.setHeaderProperties = function(header){
  var ct = this.header['content-type'] || '';
  var obj = params(ct);
  for (var key in obj) this[key] = obj[key];
};
Response.prototype.parseBody = function(str){
  var parse = request.parse[this.type];
};
Response.prototype.setStatusProperties = function(status){
  if (status === 1223) {
    status = 204;
  }
};
Response.prototype.toError = function(){
  var req = this.req;
  var method = req.method;
  var url = req.url;
  var msg = 'cannot ' + method + ' ' + url + ' (' + this.status + ')';
  var err = new Error(msg);
  err.status = this.status;
  err.method = method;
  err.url = url;
};
request.Response = Response;
function Request(method, url) {
  var self = this;
  this._query = this._query || [];
  this.method = method;
  this.url = url;
  this.header = {};
}
Request.prototype.use = function(fn) {
}
Request.prototype.timeout = function(ms){
};
Request.prototype.clearTimeout = function(){
};
Request.prototype.abort = function(){
};
Request.prototype.set = function(field, val){
};
Request.prototype.unset = function(field){
};
Request.prototype.getHeader = function(field){
};
Request.prototype.type = function(type){
};
Request.prototype.parse = function(fn){
};
Request.prototype.accept = function(type){
};
Request.prototype.auth = function(user, pass){
};
Request.prototype.query = function(val){
  if ('string' != typeof val) val = serialize(val);
};
Request.prototype.field = function(name, val){
};
Request.prototype.attach = function(field, file, filename){
};
Request.prototype.send = function(data){
};
Request.prototype.callback = function(err, res){
};
Request.prototype.crossDomainError = function(){
};
Request.prototype.timeoutError = function(){
};
Request.prototype.withCredentials = function(){
};
Request.prototype.end = function(fn){
  var xhr = this.xhr = request.getXHR();
  var data = this._formData || this._data;
  xhr.onreadystatechange = function(){
  };
  var handleProgress = function(e){
    if (e.total > 0) {
      e.percent = e.loaded / e.total * 100;
    }
  };
  if (this.hasListeners('progress')) {
    xhr.onprogress = handleProgress;
  }
  try {
    if (xhr.upload && this.hasListeners('progress')) {
      xhr.upload.onprogress = handleProgress;
    }
  } catch(e) {
  if (query) {
    this.url += ~this.url.indexOf('?')
  }
  if (this._withCredentials) xhr.withCredentials = true;
  if ('GET' != this.method && 'HEAD' != this.method && 'string' != typeof data && !isHost(data)) {
    var contentType = this.getHeader('Content-Type');
    var serialize = this._parser || request.serialize[contentType ? contentType.split(';')[0] : ''];
    if (serialize) data = serialize(data);
  }
  xhr.send(data);
};
