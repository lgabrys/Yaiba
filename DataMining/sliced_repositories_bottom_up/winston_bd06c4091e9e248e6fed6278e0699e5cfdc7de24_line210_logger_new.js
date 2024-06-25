const stream = require('stream');
const util = require('util');
const async = require('async');
const { LEVEL } = require('triple-beam');
const LegacyTransportStream = require('winston-transport/legacy');
const common = require('./common');

const formatRegExp = common.formatRegExp;


var Logger = module.exports = function Logger(options) {
};

/*
 * ### function configure (options)
 * This will wholesale reconfigure this instance by:
 * 1. Resetting all transports. Older transports will be removed implicitly.
 * 2. Set all other options including levels, colors, rewriters, filters,
 *    exceptionHandlers, etc.
 */
Logger.prototype.configure = function (options) {
  options = options || {};
  if (options.transports) {
    options.transports = Array.isArray(options.transports)
  }
};
Object.defineProperty(Logger.prototype, 'transports', {
  configurable: false,
  enumerable: true,
  get: function () {
  }
});
Logger.prototype.log = function log(level, msg, meta) {
  if (arguments.length === 1) {
    level[LEVEL] = level.level;
  }
};
Logger.prototype._transform = function _transform(info, enc, callback) {
  if (!info[LEVEL]) {
    info[LEVEL] = info.level;
  }
  if (!this._readableState.pipes) {
    console.error('[winston] Attempt to write logs with no transports %j', info);
  }
};
