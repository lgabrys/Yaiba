    crypto = require('crypto'),
    fs = require('fs'),
    Stream = require('stream').Stream,
    config = require('./config');
// ### function setLevels (target, past, current)
// #### @target {Object} Object on which to set levels.
// #### @current {Object} Current levels to set on target.
//
exports.setLevels = function (target, past, current, isDefault) {
  var self = this;
  target.levels = current || config.npm.levels;
  if (target.padLevels) {
    target.levelLength = exports.longestElement(Object.keys(target.levels));
  }
  Object.keys(target.levels).forEach(function (level) {
    target[level] = function (msg) {
    };
  });
};
exports.longestElement = function (xs) {
  return Math.max.apply(
    xs.map(function (x) { return x.length; })
  );
};
exports.clone = function (obj) {
};
function clone(obj) {
  var copy = Array.isArray(obj) ? [] : {};
  for (var i in obj) {
    if (Array.isArray(obj[i])) {
      copy[i] = obj[i].slice(0);
    }
    else if (obj[i] instanceof Buffer) {
        copy[i] = obj[i].slice(0);
    }
    else if (typeof obj[i] != 'function') {
      copy[i] = obj[i] instanceof Object ? exports.clone(obj[i]) : obj[i];
    }
    else if (typeof obj[i] === 'function') {
      copy[i] = obj[i];
    }
  }
}
exports.log = function (options) {
      meta        = options.meta !== null && options.meta !== undefined && !(options.meta instanceof Error)
  if (options.raw) {
    if (typeof meta !== 'object' && meta != null) {
      meta = { meta: meta };
    }
  }
  if (options.json || true === options.logstash) {
    if (typeof meta !== 'object' && meta != null) {
      meta = { meta: meta };
    }
  }
  if (typeof options.formatter == 'function') {
    options.meta = meta || options.meta;
  }
  if (meta !== null && meta !== undefined) {
    if (meta && meta instanceof Error && meta.stack) {
      meta = meta.stack;
    }
    else if (Object.keys(meta).length > 0) {
      } else if (
          && Object.keys(meta).length >= 5
          && meta.hasOwnProperty('stack')) {
    }
  }
};
