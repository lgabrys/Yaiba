
/**
 * Module dependencies.
 */
var FormData = require('form-data');
var Response = require('./response');
var parse = require('url').parse;
var resolve = require('url').resolve;
var methods = require('methods');
var Stream = require('stream');
var unzip = require('./unzip').unzip;
var mime = require('mime');
var https = require('https');
var http = require('http');
var qs = require('qs');
var pkg = require('../../package.json');
var request = exports = module.exports = function(method, url) {
  if ('function' == typeof url) {
  }
}
exports.Request = Request;
exports.agent = require('./agent');
function noop(){};
exports.Response = Response;
mime.define({
});
exports.serialize = {
};
