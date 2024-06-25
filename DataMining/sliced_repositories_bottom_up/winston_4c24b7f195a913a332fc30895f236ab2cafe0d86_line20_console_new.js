
var util = require('util'),

var Console = exports.Console = function (options) {
  // TODO: Consume the colorize option
  this.colorize = options.colorize;
};
Console.prototype.log = function (level, msg, meta, callback) {
  if (level !== 'error') {
    util.debug(level + ': ' + msg);
  }
};
