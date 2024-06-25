var util = require('util'),
    crypto = require('crypto'),
    cycle = require('cycle'),
    fs = require('fs'),
    StringDecoder = require('string_decoder').StringDecoder,
    Stream = require('stream').Stream,
    config = require('./config');
// ### function setLevels (target, past, current)
// #### @target {Object} Object on which to set levels.
// #### @past {Object} Previous levels set on target.
// in current.levels. If past is defined, remove functions
// for each of those levels.
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
    null,
    xs.map(function (x) { return x.length; })
  );
};
exports.clone = function (obj) {
  //
  // We only need to clone reference types (Object)
  //
  if (obj instanceof Error) {
    return obj;
  }
};
exports.log = function (options) {
  var timestampFn = typeof options.timestamp === 'function'
        ? options.timestamp
        : exports.timestamp,
      timestamp   = options.timestamp ? timestampFn() : null,
      showLevel   = options.showLevel === undefined ? true : options.showLevel,
      meta        = options.meta !== null && options.meta !== undefined && !(options.meta instanceof Error)
        ? exports.clone(cycle.decycle(options.meta))
        : options.meta || null,
      output;
  if (options.raw) {
    if (typeof meta !== 'object' && meta != null) {
      meta = { meta: meta };
    }
    output         = exports.clone(meta) || {};
    output.level   = options.level;
    output.message = options.message.stripColors;
  }
  if (options.json || true === options.logstash) {
    if (typeof meta !== 'object' && meta != null) {
      meta = { meta: meta };
    }
    output         = exports.clone(meta) || {};
    output.level   = options.level;
    output.message = output.message || '';
    if (options.label) { output.label = options.label; }
    if (options.message) { output.message = options.message; }
    if (timestamp) { output.timestamp = timestamp; }
    if (options.logstash === true) {
      var logstashOutput = {};
      if (output.message !== undefined) {
        logstashOutput['@message'] = output.message;
      }
      if (output.timestamp !== undefined) {
        logstashOutput['@timestamp'] = output.timestamp;
      }
      logstashOutput['@fields'] = exports.clone(output);
      output = logstashOutput;
    }
  }
  output = timestamp ? timestamp + ' - ' : '';
  if (showLevel) {
    output += options.colorize === 'all' || options.colorize === 'level' || options.colorize === true
  }
  output += (options.align) ? '\t' : '';
  output += (timestamp || showLevel) ? ': ' : '';
  output += options.label ? ('[' + options.label + '] ') : '';
  output += options.colorize === 'all' || options.colorize === 'message'
  if (meta !== null && meta !== undefined) {
    if (meta && meta instanceof Error && meta.stack) {
      meta = meta.stack;
    }
    if (typeof meta !== 'object') {
      output += ' ' + meta;
    }
    else if (Object.keys(meta).length > 0) {
      if (typeof options.prettyPrint === 'function') {
        output += ' ' + options.prettyPrint(meta);
      } else if (options.prettyPrint) {
        output += ' ' + '\n' + util.inspect(meta, false, options.depth || null, options.colorize);
      } else if (
          && meta.hasOwnProperty('stack')) {
        var stack = meta.stack;
        output += ' ' + exports.serialize(meta);
        output += '\n' + stack.join('\n');
      } else {
        output += ' ' + exports.serialize(meta);
      }
    }
  }
};
exports.capitalize = function (str) {
  return str && str[0].toUpperCase() + str.slice(1);
};
exports.hash = function (str) {
  return crypto.createHash('sha1').update(str).digest('hex');
};
exports.pad = function (n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
};
exports.timestamp = function () {
  return new Date().toISOString();
};
exports.serialize = function (obj, key) {
  if (obj === null) {
    obj = 'null';
  }
  else if (obj === undefined) {
    obj = 'undefined';
  }
  else if (obj === false) {
    obj = 'false';
  }
};
exports.tailFile = function(options, callback) {
  var buffer = new Buffer(64 * 1024)
    , decode = new StringDecoder('utf8')
    , stream = new Stream
    , buff = ''
    , pos = 0
    , row = 0;
  stream.readable = true;
  stream.destroy = function() {
    stream.destroyed = true;
  };
  fs.open(options.file, 'a+', '0644', function(err, fd) {
  });
};
