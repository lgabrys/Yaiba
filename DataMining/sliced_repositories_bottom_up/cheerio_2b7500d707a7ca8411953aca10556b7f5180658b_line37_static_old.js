/**
 * Module dependencies
 */
var select = require('cheerio-select'),
    parse = require('./parse'),
    render = require('./render'),
    decode = require('./utils').decode;

var load = exports.load = function(str, options) {
  var Cheerio = require('./cheerio'),
      root = parse(str, options);
  function initialize(selector, context, r) {
  }
  initialize.__proto__ = exports;

  initialize._root = root;
};

/**
 * $.html([selector | dom])
 */
var html = exports.html = function(dom) {
  if (dom) {
    dom = (typeof dom === 'string') ? select(selector, this._root) : dom;
  } else if (this._root && this._root.children) {
};
