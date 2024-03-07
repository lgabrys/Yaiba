/*
 * file.js: Transport for outputting to a local log file
 *
 * (C) 2010 Charlie Robbins
 * MIT LICENCE
 *
 */

var events = require('events'),
    fs = require('fs'),
    path = require('path'),
    util = require('util'),
    colors = require('colors'),
    common = require('../common'),
    Transport = require('./transport').Transport,
    Stream = require('stream').Stream;

//
// ### function File (options)
// #### @options {Object} Options for this instance.
// Constructor function for the File transport object responsible
// for persisting log messages and metadata to one or more files.
//
var File = exports.File = function (options) {
  Transport.call(this, options);

  //
  // Helper function which throws an `Error` in the event
  // that any of the rest of the arguments is present in `options`.
  //
  function throwIf (target /*, illegal... */) {
    Array.prototype.slice.call(arguments, 1).forEach(function (name) {
      if (options[name]) {
        throw new Error('Cannot set ' + name + ' and ' + target + 'together');
      }
    });
  }

  if (options.filename || options.dirname) {
    throwIf('filename or dirname', 'stream');
    this._basename = this.filename = path.basename(options.filename) || 'winston.log';
    this.dirname   = options.dirname || path.dirname(options.filename);
    this.options   = options.options || { flags: 'a' };
  }
  else if (options.stream) {
    throwIf('stream', 'filename', 'maxsize');
    this._stream = options.stream;
  }
  else {
    throw new Error('Cannot log to file without filename or stream.');
  }

  this.json      = options.json !== false;
  this.colorize  = options.colorize  || false;
  this.maxsize   = options.maxsize   || null;
  this.maxFiles  = options.maxFiles  || null;
  this.timestamp = typeof options.timestamp !== 'undefined' ? options.timestamp : false;

  //
  // Internal state variables representing the number
  // of files this instance has created and the current
  // size (in bytes) of the current logfile.
  //
  this._size     = 0;
  this._created  = 0;
  this._buffer   = [];
  this._draining = false;
};

//
// Inherit from `winston.Transport`.
//
util.inherits(File, Transport);

//
// Expose the name of this Transport on the prototype
//
File.prototype.name = 'file';

//
// ### function log (level, msg, [meta], callback)
// #### @level {string} Level at which to log the message.
// #### @msg {string} Message to log
// #### @meta {Object} **Optional** Additional metadata to attach
// #### @callback {function} Continuation to respond to when complete.
// Core logging method exposed to Winston. Metadata is optional.
//
File.prototype.log = function (level, msg, meta, callback) {
  if (this.silent) {
    return callback(null, true);
  }

  var self = this, output = common.log({
    level:     level,
    message:   msg,
    meta:      meta,
    json:      this.json,
    colorize:  this.colorize,
    timestamp: this.timestamp
  }) + '\n';

  this._size += output.length;

  if (!this.filename) {
    //
    // If there is no `filename` on this instance then it was configured
    // with a raw `WriteableStream` instance and we should not perform any
    // size restrictions.
    //
    this._stream.write(output);
    self._lazyDrain();
  }
  else {
    this.open(function (err) {
      if (err) {
        //
        // If there was an error enqueue the message
        //
        return self._buffer.push(output);
      }

      self._stream.write(output);
      self._lazyDrain();
    });
  }

  callback(null, true);
};

//
// ### function query (options)
// #### @options {Object} Set stream options
// #### @callback {function} Callback
// Query the transport.
//

File.prototype.query = function (options, callback) {
  var file = path.join(this.dirname, this.filename)
    , options = this.normalizeQuery(options)
    , buff = ''
    , results = []
    , row = 0;

  var stream = fs.createReadStream(file, {
    encoding: 'utf8'
  });

  stream.on('error', function(err) {
    stream.destroy();
    if (callback) callback(err);
  });

  stream.on('data', function(data) {
    var data = (buff + data).split(/\n+/)
      , l = data.length - 1
      , i = 0;

    for (; i < l; i++) {
      if (!options.start || row >= options.start) {
        check(data[i]);
      }
      row++;
    }

    buff = data[l];
  });

  stream.on('close', function() {
    if (options.order === 'desc') {
      results = results.reverse();
    }
    if (callback) callback(null, results);
  });

  function check(buff) {
    try {
      var log = JSON.parse(buff);
      if (match(log)) add(log);
    } catch (e) {
      stream.emit('error', e);
    }
  }

  function add(log) {
    if (options.rows && results.length >= options.rows) {
      return stream.destroy();
    }

    if (options.fields) {
      var obj = {};
      options.fields.forEach(function(key) {
        obj[key] = log[key];
      });
      log = obj;
    }

    results.push(log);
  }

  function match(log) {
    if (!log) return;

    if (log.timestamp < options.from || log.timestamp > options.until) {
      return;
    }

    return true;
  }
};

//
// ### function _tail (file, callback)
// #### @file {String} Name of file to tail
// #### @callback {function} Callback to execute on every line.
// `tail -f` a file.
//

File.prototype._tail = function tail(file, callback) {
  var stream = fs.createReadStream(file, { encoding: 'utf8' })
    , buff = ''
    , destroy;

  destroy = stream.destroy.bind(stream);
  stream.destroy = function() {};

  stream.once('end', function() {
    stream.on('data', function(data) {
      var data = (buff + data).split(/\n+/)
        , l = data.length - 1
        , i = 0;

      for (; i < l; i++) {
        stream.emit('line', data[i]);
      }

      buff = data[l];
    });

    stream.on('line', function(data) {
      if (callback) callback(data);
    });

    stream.on('error', function(err) {
      destroy();
    });

    stream.on('end', function() {
      if (buff) {
        line(buff);
        buff = '';
      }

      resume();
    });

    resume();
  });

  function resume() {
    setTimeout(function() {
      stream.resume();
    }, 1000);
  }

  return destroy;

  // return {
  //   __proto__: stream,
  //   destroy: destroy
  // };
};

//
// ### function stream (options)
// #### @options {Object} Set stream options
// Returns a log stream.
//

File.prototype.stream = function(options) {
  var file = path.join(this.dirname, this.filename)
    , options = options || {};

  var stream = new Stream;

  stream.destroy = this._tail(file, function(line) {
    try {
      stream.emit('data', line);
      line = JSON.parse(line);
      if (check(line)) {
        stream.emit('log', line);
      }
    } catch (e) {
      stream.emit('error', e);
    }
  });

  // file.on('error', function(err) {
  //   stream.emit('error', err);
  // });

  function check(line) {
    if (!line) return;

    var keys = Object.keys(line.meta || {})
      , l = keys.length
      , i = 0;

    for (; i < l; i++) {
      if (options[key] && options[key] !== line.meta[key]) {
        return;
      }
    }

    return true;
  }

  return stream;
};

//
// ### function open (callback)
// #### @callback {function} Continuation to respond to when complete
// Checks to see if a new file needs to be created based on the `maxsize`
// (if any) and the current size of the file used.
//
File.prototype.open = function (callback) {
  if (this.opening) {
    //
    // If we are already attempting to open the next
    // available file then respond with a value indicating
    // that the message should be buffered.
    //
    return callback(true);
  }
  else if (!this._stream || (this.maxsize && this._size >= this.maxsize)) {
    //
    // If we dont have a stream or have exceeded our size, then create
    // the next stream and respond with a value indicating that
    // the message should be buffered.
    //
    callback(true);
    return this._createStream();
  }

  //
  // Otherwise we have a valid (and ready) stream.
  //
  callback();
};

//
// ### function close ()
// Closes the stream associated with this instance.
//
File.prototype.close = function () {
  var self = this;

  if (this._stream) {
    this._stream.end();
    this._stream.destroySoon();

    this._stream.once('drain', function () {
      self.emit('flush');
      self.emit('closed');
    });
  }
};

//
// ### function flush ()
// Flushes any buffered messages to the current `stream`
// used by this instance.
//
File.prototype.flush = function () {
  var self = this;

  //
  // Iterate over the `_buffer` of enqueued messaged
  // and then write them to the newly created stream.
  //
  this._buffer.forEach(function (str) {
    process.nextTick(function () {
      self._stream.write(str);
      self._size += str.length;
    });
  });

  //
  // Quickly truncate the `_buffer` once the write operations
  // have been started
  //
  self._buffer.length = 0;

  //
  // When the stream has drained we have flushed
  // our buffer.
  //
  self._stream.once('drain', function () {
    self.emit('flush');
    self.emit('logged');
  });
};

//
// ### @private function _createStream ()
// Attempts to open the next appropriate file for this instance
// based on the common state (such as `maxsize` and `_basename`).
//
File.prototype._createStream = function () {
  var self = this;
  this.opening = true;

  (function checkFile (target) {
    var fullname = path.join(self.dirname, target);

    //
    // Creates the `WriteStream` and then flushes any
    // buffered messages.
    //
    function createAndFlush (size) {
      if (self._stream) {
        self._stream.end();
        self._stream.destroySoon();
      }

      self._size = size;
      self.filename = target;
      self._stream = fs.createWriteStream(fullname, self.options);

      //
      // When the current stream has finished flushing
      // then we can be sure we have finished opening
      // and thus can emit the `open` event.
      //
      self.once('flush', function () {
        self.opening = false;
        self.emit('open', fullname);
      });

      //
      // Remark: It is possible that in the time it has taken to find the
      // next logfile to be written more data than `maxsize` has been buffered,
      // but for sensible limits (10s - 100s of MB) this seems unlikely in less
      // than one second.
      //
      self.flush();
    }

    fs.stat(fullname, function (err, stats) {
      if (err) {
        if (err.code !== 'ENOENT') {
          return self.emit('error', err);
        }

        return createAndFlush(0);
      }

      if (!stats || (self.maxsize && stats.size >= self.maxsize)) {
        //
        // If `stats.size` is greater than the `maxsize` for
        // this instance then try again
        //
        return checkFile(self._getFile(true));
      }

      createAndFlush(stats.size);
    });
  })(this._getFile());
};

//
// ### @private function _getFile ()
// Gets the next filename to use for this instance
// in the case that log filesizes are being capped.
//
File.prototype._getFile = function (inc) {
  var self = this,
      ext = path.extname(this._basename),
      basename = path.basename(this._basename, ext),
      remaining;

  if (inc) {
    //
    // Increment the number of files created or
    // checked by this instance.
    //
    // Check for maxFiles option and delete file
    if (this.maxFiles && (this._created >= (this.maxFiles - 1))) {
      remaining = this._created - (this.maxFiles - 1);
      if (remaining === 0) {
        fs.unlinkSync(path.join(this.dirname, basename + ext));
      }
      else {
        fs.unlinkSync(path.join(this.dirname, basename + remaining + ext));
      }
    }

    this._created += 1;
  }

  return this._created
    ? basename + this._created + ext
    : basename + ext;
};

//
// ### @private function _lazyDrain ()
// Lazily attempts to emit the `logged` event when `this.stream` has
// drained. This is really just a simple mutex that only works because
// Node.js is single-threaded.
//
File.prototype._lazyDrain = function () {
  var self = this;

  if (!this._draining && this._stream) {
    this._draining = true;

    this._stream.once('drain', function () {
      this._draining = false;
      self.emit('logged');
    });
  }
};
