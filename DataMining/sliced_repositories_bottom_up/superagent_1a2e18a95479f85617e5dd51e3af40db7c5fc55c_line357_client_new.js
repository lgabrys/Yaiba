var Emitter = require('emitter');
var trim = ''.trim
function serialize(obj) {
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
  return parse && str && str.length
};
