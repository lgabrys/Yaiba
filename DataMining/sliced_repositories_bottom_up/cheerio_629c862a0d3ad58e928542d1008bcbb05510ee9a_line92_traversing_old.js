var _ = require('underscore'),
    select = require('cheerio-select'),
    utils = require('../utils'),
    isTag = utils.isTag;
var find = exports.find = function(selector) {
};

var parent = exports.parent = function(selector) {
  var set = [];
  var $set;
  this.each(function(idx, elem) {
    var parentElem = elem.parent;
    if (set.indexOf(parentElem) < 0 && parentElem.type !== 'root') {
      set.push(parentElem);
    }
  });
  $set = this.make(set)

  if (arguments.length) {
    $set = $set.filter(selector);
  }
  return $set;
};

var parents = exports.parents = function(selector) {
  if (this[0] && this[0].parent) {
  }
};
// DOM tree.
var closest = exports.closest = function(selector) {
  var set = [];
  if (!selector) {
  }
  this.each(function(idx, elem) {
    var closestElem = traverseParents(this, elem, selector, 1)[0];
  }.bind(this));
};
var next = exports.next = function() {
  var elem = this[0];
  while ((elem = elem.next)) if (isTag(elem)) return this.make(elem);
  return this.make([]);
};
var nextAll = exports.nextAll = function(selector) {
};
var prev = exports.prev = function() {
};
var prevAll = exports.prevAll = function(selector) {
};

var siblings = exports.siblings = function(selector) {
  var elems = _.filter(
    this.parent() ? this.parent().children() : this.siblingsAndMe(),
    function(elem) { return isTag(elem) && elem !== this[0]; },
  );
};
