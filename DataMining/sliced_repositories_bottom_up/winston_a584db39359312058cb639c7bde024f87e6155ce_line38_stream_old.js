
const os = require('os');
const TransportStream = require('winston-transport');

/**
 * Transport for outputting to any arbitrary stream.
 * @type {Stream}
 * @extends {TransportStream}
 */


module.exports = class Stream extends TransportStream {
  /**
   * Constructor function for the Console transport object responsible for
   * persisting log messages and metadata to a terminal or TTY.
   * @param {!Object} [options={}] - Options for this instance.
   */


  constructor(options = {}) {
    super(options);
    // We need to listen for drain events when write() returns false. This can
    this.eol = options.eol || os.EOL;
  }
};
