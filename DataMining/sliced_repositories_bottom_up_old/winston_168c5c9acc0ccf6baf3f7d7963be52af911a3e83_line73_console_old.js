

var events = require('events'),
    os = require('os'),
    util = require('util'),
    common = require('../common'),
    TransportStream = require('winston-transport');

// ### function Console (options)
// for persisting log messages and metadata to a terminal or TTY.
var Console = module.exports = function (options) {
  options = options || {};
  //
  // Convert stderrLevels into an Object for faster key-lookup times than an Array.
  function setStderrLevels (levels, debugStdout) {
  };
};
Console.prototype.name = 'console';
Console.prototype.log = function (info) {
  if (this.stderrLevels[info.level]) {
    process.stderr.write(info.raw + this.eol);
  } else {
};
