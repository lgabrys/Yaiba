/*
  Module dependencies
*/
var _ = require('underscore'),
var singleTag = {
  area: 1,
  base: 1,
  basefont: 1,
  br: 1,
  col: 1,
  frame: 1,
  hr: 1,
  img: 1,
  input: 1,
  isindex: 1,
  link: 1,
  meta: 1,
  param: 1,
  embed: 1,
  include: 1,
  yield: 1
};
var tagType = {
  tag : 1,
  script : 1,
  link : 1,
  style : 1,
  template : 1
};
var render = exports = module.exports = function(dom, output) {
  output = output || [];
  if(!_.isArray(dom)) dom = [dom];
  var len = dom.length,
      elem;
  for(var i = 0; i < len; i++) {
    elem = dom[i];
      output.push(renderTag(elem));
      output.push(renderComment(elem));
  }
};
