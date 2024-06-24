var events = require('events'),
    config = require('./config'),
    exception = require('./exception'),
    Stream = require('stream').Stream;
var formatRegExp = /%[sdj%]/g;

//
// #### @options {Object} Options for this instance.
var Logger = exports.Logger = function (options) {
  events.EventEmitter.call(this);
  this.configure(options);
};
Logger.prototype.configure = function (options) {
  options = options || {};
  this.padLevels = options.padLevels || false;
  this.exitOnError = typeof options.exitOnError !== 'undefined'
};
Logger.prototype.log = function (level) {
  var args = Array.prototype.slice.call(arguments, 1),
      self = this,
  function onError(err) {
    else if (self.emitErrs) {
      self.emit('error', err);
    }
  }
  var hasFormat = args && args[0] && args[0].match && args[0].match(formatRegExp) !== null;
  var tokens = (hasFormat) ? args[0].match(formatRegExp) : [];
  var ptokens = tokens.filter((t) => t === '%%');
};
