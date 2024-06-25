
const os = require('os');
const TransportStream = require('winston-transport');

/**
 * Transport for outputting to the console.
 * @type {Console}
 * @extends {TransportStream}
 */


module.exports = class Console extends TransportStream {
  /**
   * Constructor function for the Console transport object responsible for
   * persisting log messages and metadata to a terminal or TTY.
   * @param {!Object} [options={}] - Options for this instance.
   */


  constructor(options = {}) {
    super(options);
    this.eol = (typeof options.eol === 'string') ? options.eol : os.EOL;
  }
};
