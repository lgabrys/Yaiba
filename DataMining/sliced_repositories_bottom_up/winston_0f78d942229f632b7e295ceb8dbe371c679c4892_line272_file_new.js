    fs = require('fs'),
    path = require('path'),
    util = require('util'),
    common = require('../common'),
    Transport = require('./transport').Transport,
//
// Constructor function for the File transport object responsible
// for persisting log messages and metadata to one or more files.
//
var File = exports.File = function (options) {
  // Helper function which throws an `Error` in the event
  this.maxFiles  = options.maxFiles  || null;
};

File.prototype.name = 'file';
File.prototype.log = function (level, msg, meta, callback) {
  if (!this.filename) {
    // size restrictions.
  }
};
File.prototype.query = function (options, callback) {
  var file = path.join(this.dirname, this.filename)
      options = this.normalizeQuery(options),
      buff = '',
      results = [],
      row = 0;
  var stream = fs.createReadStream(file, {
  });
  stream.on('data', function(data) {
        l = data.length - 1,
    for (; i < l; i++) {
      row++;
    }
    buff = data[l];
  });
  stream.on('close', function() {
    if (options.order === 'desc') {
      results = results.reverse();
    }
  });

  function push(log) {
    if (options.fields) {
      var obj = {};
      options.fields.forEach(function(key) {
        obj[key] = log[key];
      });
      log = obj;
    }
    results.push(log);
  }
};
// ### function _tail (file, callback)
File.prototype._tail = function tail(options, callback) {
  var stream = fs.createReadStream(options.file, { encoding: 'utf8' }),
      buff = '',
      destroy,
      row = 0;
  destroy = stream.destroy.bind(stream);
  stream.destroy = function() {};
  function bind() {
    stream.on('data', function(data) {
      var data = (buff + data).split(/\n+/),
          l = data.length - 1,
          i = 0;
      for (; i < l; i++) {
        row++;
      }
      buff = data[l];
    });
    stream.on('end', function() {
      if (buff) {
        stream.emit('line', buff);
      }
    });
  }
};
