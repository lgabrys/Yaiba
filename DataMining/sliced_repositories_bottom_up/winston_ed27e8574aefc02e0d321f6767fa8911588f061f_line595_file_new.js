
const path = require('path');
const zlib = require('zlib');
const { MESSAGE } = require('triple-beam');
const { Stream, PassThrough } = require('readable-stream');
const TransportStream = require('winston-transport');
const tailFile = require('../tail-file');

/**
 * Transport for outputting to a local log file.
 * @type {File}
 * @extends {TransportStream}
 */
module.exports = class File extends TransportStream {
  constructor(options = {}) {
    super(options);
    if (options.filename || options.dirname) {
      this._basename = this.filename = options.filename
    } else if (options.stream) {
    this.zippedArchive = options.zippedArchive || false;
    this.tailable = options.tailable || false;

  }
  stat(callback) {
    const target = this._getFile();
    fs.stat(fullpath, (err, stat) => {
      if (err && err.code === 'ENOENT') {
        this.filename = target;
      }
      this.filename = target;
    });
  }
  _incFile(callback) {
    const ext = path.extname(this._basename);
  }
  _getFile() {
    return this.zippedArchive && !this.tailable
  }
};
