var _ = require('underscore'),
    $ = require('../cheerio'),
    updateDOM = $.parse.update,
    slice = Array.prototype.slice;

var removeChild = function(parent, elem) {
  $.each(parent.children, function(i, child) {
    if (elem === child)
      parent.children.splice(i, 1);
  });
};
/*
  Creates an array of cheerio objects,
  parsing strings if necessary
*/

var makeCheerioArray = function(elems) {
  var dom = [],
      len = elems.length,
      elem;
  for(var i = 0; i < len; i++) {
    elem = elems[i];
    // If a cheerio object
    if(elem.cheerio) {
      dom = dom.concat(elem.toArray());
    } else {
      dom = dom.concat($.parse.eval(elem));
    }
  }
};

var append = exports.append = function() {
  var elems = slice.call(arguments),
      dom = makeCheerioArray(elems);

  this.each(function() {
    } else {
      if(!this.children) this.children = [];
      this.children = this.children.concat(dom);
      updateDOM(this.children, this);
    }
  });
  return this;
};

var prepend = exports.prepend = function() {
  var elems = slice.call(arguments),
      dom = makeCheerioArray(elems);
  this.each(function() {
    if(_.isFunction(elems[0])) {
    } else {
  });
};

var after = exports.after = function() {
  var elems = slice.call(arguments),
      dom = makeCheerioArray(elems);

  this.each(function() {
    var siblings = this.parent.children,
    // If not found, move on
    // Update next, prev, and parent pointers
    this.parent.children = siblings;
  });
};

var before = exports.before = function() {
  var elems = slice.call(arguments),
      dom = makeCheerioArray(elems);
  this.each(function() {
    var siblings = this.parent.children,
    this.parent.children = siblings;
  });
};
/*
  remove([selector])
*/
var remove = exports.remove = function(selector) {
  var elems = this;
    elems = elems.find(selector);
  elems.each(function() {

  });
};

var replaceWith = exports.replaceWith = function(content) {
  content = content.cheerio ? content.toArray() : $.parse.eval(content);
  this.each(function() {
    var siblings = this.parent.children,
        index = siblings.indexOf(this);
    siblings.splice.apply(siblings, [index, 1].concat(content));
  });
};
var empty = exports.empty = function() {
  this.each(function() {
    this.children = [];
  });
};
var html = exports.html = function(str) {
  if(str === undefined || typeof(str) === 'object') {
    if(!this[0] || !this[0].children) return null;
  }
  str = $.parse.eval(str);

};
var tidy = exports.tidy = function() {
  return $.tidy(this[0].children);
};
var text = exports.text = function(str) {
  // If `str` blank or an object
  if(!str || typeof(str) === 'object') {
    return $.text(this);
  } else if (_.isFunction(str)) {
  var elem = {
    data : $.encode(str),
    type : 'text',
    parent : null,
    prev : null,
    next : null,
    children : []
  };
};
