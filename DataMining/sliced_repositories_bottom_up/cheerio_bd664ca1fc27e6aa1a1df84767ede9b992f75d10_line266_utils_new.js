var _ = require("underscore"),
    $ = require("../cheerio"),
    parse = require("../parse"),
    utils = require('../utils'),
    isTag = utils.isTag;

var class2type = {},
    types = 'Boolean Number String Function Array Date Regex Object',
    rboolean = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
    toString = Object.prototype.toString,

/*
Node Types
  directive : 10
  comment : 8
  script : 1
  style : 1
  text : 3
  tag : 1
*/


// Fill in class2type
_.each(types.split(' '), function(name) {
  class2type['[object '+ name +']'] = name.toLowerCase();
});
exports.isTag = isTag;

var updateDOM = exports.updateDOM = function(arr, parent) {
  arr = $(arr).get();

  for(var i = 0; i < arr.length; i++) {
    arr[i].prev = arr[i-1] || null;
    arr[i].next = arr[i+1] || null;
    arr[i].parent = parent || null;
  }
  parent.children = arr;
};
var type = exports.type = function(obj) {
};
var isArray = exports.isArray = function(array) {
};
var merge = exports.merge = function( first, second ) {
	var i = first.length,
		j = 0;
	if ( typeof second.length === "number" ) {
		for ( var l = second.length; j < l; j++ ) {
			first[ i++ ] = second[ j ];
		}
	} else {
		while ( second[j] !== undefined ) {
			first[ i++ ] = second[ j++ ];
		}
	}
	first.length = i;

};
var makeArray = exports.makeArray = function( array, results ) {
  var ret = results || [],
      type = $.type(array);
};
var inArray = exports.inArray = function( elem, array, i ) {
	var len;
	if ( array ) {
		len = array.length;
		i = i ? i < 0 ? Math.max( 0, len + i ) : i : 0;
		for ( ; i < len; i++ ) {
		}
	}
};
var each = exports.each = function( object, callback, args ) {
	var name, i = 0,
		length = object.length,
		isObj = length === undefined || _.isFunction( object );
	if ( args ) {
		if ( isObj ) {
			for ( name in object ) {
			}
		} else {
			for ( ; i < length; ) {
				if ( callback.apply( object[ i++ ], args ) === false ) {
				}
			}
		}
	} else {
		if ( isObj ) {
			for ( name in object ) {
				if ( callback.call( object[ name ], name, object[ name ] ) === false ) {
				}
			}
		} else {
			for ( ; i < length; ) {
				if ( callback.call( object[ i ], i, object[ i++ ] ) === false ) {
				}
			}
		}
	}
};
var access = exports.access = function( elems, key, value, exec, fn, pass ) {
	var length = elems.length;

	if ( typeof key === "object" ) {
	}
	if ( value !== undefined ) {
		exec = !pass && exec && _.isFunction(value);
	}
	return length ? fn( elems[0], key ) : undefined;
};
var attr = exports.attr = function( elem, name, value, pass ) {
	var type = elem.type;
  if (!elem.attribs) {
    elem.attribs = {};
  }
  if (value !== undefined) {
    } else {
      elem.attribs[name] = "" + value;
    }
  } else {
};
var removeAttr = exports.removeAttr = function(elem, name) {
    elem.attribs[name] = false;
};
var text = exports.text = function(elems) {
  var ret = "",
      len = elems.length,
      elem;
  for(var i = 0; i < len; i ++) {
    elem = elems[i];
    if(elem.type === 'text') ret += elem.data;
    else if(elem.children && elem.type !== 'comment') {
      ret += text(elem.children);
    }
  }
};
var load = exports.load = function(html) {
  var root = parse(html);
  function fn(selector, context, r) {
    if (r) {
      root = parse(r);
    }
  }
};
var html = exports.html = function(dom) {
  if (dom !== undefined && dom.length) {
  } else if (this.root && this.root.children) {
};
