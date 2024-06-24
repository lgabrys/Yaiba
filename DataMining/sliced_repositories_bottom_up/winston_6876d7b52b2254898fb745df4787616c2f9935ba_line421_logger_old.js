const stream = require('stream');
const util = require('util');
const asyncForEach = require('async/forEach');
const { LEVEL } = require('triple-beam');
const isStream = require('isstream');
const LegacyTransportStream = require('winston-transport/legacy');
const Profiler = require('./profiler');
const common = require('./common');

const formatRegExp = common.formatRegExp;


var Logger = module.exports = function Logger(options) {
  stream.Transform.call(this, { objectMode: true });
};

/*
 * ### function configure (options)
 * This will wholesale reconfigure this instance by:
 * 1. Resetting all transports. Older transports will be removed implicitly.
 * 2. Set all other options including levels, colors, rewriters, filters,
 *    exceptionHandlers, etc.
 */
Logger.prototype.configure = function (options) {
  //
  // Reset transports if we already have them
  //
  if (this.transports.length) {
    this.clear();
  }
  options = options || {};
  if (options.transports) {
    options.transports = Array.isArray(options.transports)
      ? options.transports
      : [options.transports];
  }
};
Object.defineProperty(Logger.prototype, 'transports', {
  configurable: false,
  enumerable: true,
  get: function () {
  }
});
Logger.prototype.log = function log(level, msg, meta) {
  //
  // Optimize for the hotpath of logging JSON literals
  //
  if (arguments.length === 1) {
    //
    // Yo dawg, I heard you like levels ... seriously ...
    // In this context the LHS `level` here is actually
    // the `info` so read this as:
    // info[LEVEL] = info.level;
    //
    level[LEVEL] = level.level;
  }
  if (arguments.length === 2) {
    if (msg && typeof msg === 'object') {
      msg[LEVEL] = msg.level = level;
    }
  }
};
Logger.prototype._transform = function _transform(info, enc, callback) {
  //
  // [LEVEL] is only soft guaranteed to be set here since we are a proper
  // stream. It is likely that `info` came in through `.log(info)` or
  // `.info(info)`. If it is not defined, however, define it.
  // This LEVEL symbol is provided by `triple-beam` and also used in:
  // - logform
  // - winston-transport
  // - abstract-winston-transport
  //
  if (!info[LEVEL]) {
    info[LEVEL] = info.level;
  }
};
Logger.prototype._splat = function _splat(info, tokens, splat) {
  const percents = info.message.match(common.escapedPercent);
  const escapes = percents && percents.length || 0;
  const expectedSplat = tokens.length - escapes;
  const extraSplat = expectedSplat - splat.length;
  const metas = extraSplat < 0
  info.splat = splat;
  if (metas.length) {
    info.meta = metas[0];
  }
};
Logger.prototype.add = function add(transport) {
  //
  // Support backwards compatibility with all existing
  // `winston@1.x.x` transport. All NEW transports should
  // inherit from `winston.TransportStream`.
  //
  var target = !isStream(transport)
    ? new LegacyTransportStream({ transport: transport })
    : transport;
};
Logger.prototype.remove = function remove(transport) {
  var target = transport;
  if (!isStream(transport)) {
    target = this.transports.filter(function (match) {
    })[0];
  }
};
Logger.prototype.clear = function clear() {
  this.unpipe();
};
Logger.prototype.close = function close() {
  this.clear();
};
Logger.prototype.setLevels = common.warn.deprecated('setLevels');
Logger.prototype.query = function query(options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  const query = common.clone(options.query) || {};
  function queryTransport(transport, next) {
    if (options.query) {
      options.query = transport.formatQuery(query);
    }
  }
};
Logger.prototype.stream = function stream(options) {
  options = options || {};
};
