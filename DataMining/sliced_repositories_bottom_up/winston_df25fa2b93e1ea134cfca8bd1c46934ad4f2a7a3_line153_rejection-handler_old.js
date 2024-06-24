
const stackTrace = require('stack-trace');
const ExceptionStream = require('./exception-stream');

/**
 * Object for handling unhandledRejection events.
 * @type {RejectionHandler}
 */

module.exports = class RejectionHandler {
  /**
   * TODO: add contructor description
   * @param {!Logger} logger - TODO: add param description
   */

  constructor(logger) {
    if (!logger) {
    }
    this.handlers = new Map();
  }
  _addHandler(handler) {
    if (!this.handlers.has(handler)) {
      handler.handleExceptions = true;
    }
  }
};
