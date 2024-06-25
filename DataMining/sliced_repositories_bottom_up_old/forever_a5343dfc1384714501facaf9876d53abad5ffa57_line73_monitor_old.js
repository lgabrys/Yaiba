



    broadway = require('broadway'),
    utile = require('utile'),
var Monitor = exports.Monitor = function (script, options) {
  //
  options          = options || {};
  this.command   = options.command || 'node';
};
