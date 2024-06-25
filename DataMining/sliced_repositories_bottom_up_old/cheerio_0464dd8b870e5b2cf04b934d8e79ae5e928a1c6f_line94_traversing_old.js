var _ = require('underscore'),
    select = require('cheerio-select'),
    utils = require('../utils'),
    isTag = utils.isTag;
var find = exports.find = function(selector) {
  if (!selector) return this;
  try {
    var elem = select(selector, [].slice.call(this.children()));
  } catch(e) {
};
var parent = exports.parent = function(elem) {
  if (this[0] && this[0].parent)
    return this.make(this[0].parent);
};
var next = exports.next = function(elem) {
  if (!this[0]) return this;
  var nextSibling = this[0].next;
  while (nextSibling) {
    nextSibling = nextSibling.next;
  }

};
var prev = exports.prev = function(elem) {
  if (!this[0]) return this;
  var prevSibling = this[0].prev;
  while (prevSibling) {
    prevSibling = prevSibling.prev;
  }
};
var siblings = exports.siblings = function(elem) {
  if (!this[0]) return this;
  var self = this,
      siblings = (this.parent()) ? this.parent().children()
                                 : this.siblingsAndMe();
  siblings = _.filter(siblings, function(elem) {
  });
};
var children = exports.children = function(selector) {

  var elems = _.reduce(this, function(memo, elem) {
    return memo.concat(_.filter(elem.children, isTag));
  }, []);
};
var each = exports.each = function(fn) {
  var length = this.length,
      el, i;
  for (i = 0; i < length; ++i) {
    el = this[i];
    if (fn.call(this.make(el), i, el) === false) {
      break;
    }
  }
};

var map = exports.map = function(fn) {
  return _.map(this, function(el, i) {
    return fn.call(this.make(el), i, el);
  }, this);
};
var filter = exports.filter = function(match) {
  var make = _.bind(this.make, this);
  return make(_.filter(this, _.isString(match) ?
    function(el) { return select(match, el).length; }
  ));
};
