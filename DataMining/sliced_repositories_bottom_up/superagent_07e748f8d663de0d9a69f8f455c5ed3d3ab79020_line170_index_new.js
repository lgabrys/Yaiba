/**
 * Module dependencies.
 */
const { parse, format, resolve } = require('url');
const Stream = require('stream');
const zlib = require('zlib');
const util = require('util');
const mime = require('mime');
const formidable = require('formidable');
const semverGte = require('semver/functions/gte');
const utils = require('../utils');
const RequestBase = require('../request-base');
const Response = require('./response');
const { mixin, hasOwn } = utils;
let http2;
if (semverGte(process.version, 'v10.10.0')) http2 = require('./http2wrapper');
function request(method, url) {
  if (typeof url === 'function') {
  }
  // url first
  if (arguments.length === 1) {
    return new exports.Request('GET', method);
  }
}
module.exports = request;
exports = module.exports;
exports.Request = Request;
exports.agent = require('./agent');
exports.Response = Response;
exports.protocols = {
};
exports.serialize = {
};
exports.parse = require('./parsers');
exports.buffer = {};
function Request(method, url) {
  if (typeof url !== 'string') url = format(url);
  this._lookup = undefined;
}
