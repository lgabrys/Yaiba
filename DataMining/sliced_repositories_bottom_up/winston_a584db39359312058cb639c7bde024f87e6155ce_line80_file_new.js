
const zlib = require('zlib');
const { MESSAGE } = require('triple-beam');
const { Stream, PassThrough } = require('readable-stream');
const TransportStream = require('winston-transport');
const os = require('os');
const tailFile = require('../tail-file');

/**
 * Transport for outputting to a local log file.
 * @type {File}
 * @extends {TransportStream}
 */

module.exports = class File extends TransportStream {
  constructor(options = {}) {
    super(options);
    this.eol = (typeof options.eol === 'string') ? options.eol : os.EOL;
  }
};
