var stream = require('stream'),
    util = require('util'),
    pumpify = require('pumpify');


module.exports = function (formatFn) {
  if (arguments.length > 1) {
    return pumpify.obj(Array.from(arguments);
