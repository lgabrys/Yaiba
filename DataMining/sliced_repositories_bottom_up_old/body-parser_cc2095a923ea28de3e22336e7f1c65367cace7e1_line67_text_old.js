var contentType = require('content-type')
var debug = require('debug')('body-parser:text')
var read = require('../read')
var typeis = require('type-is')

/**
 * Module exports.
 */



module.exports = text

/**
 * Create a middleware to parse text bodies.
 *
 * @param {object} [options]
 * @return {function}
 * @api public
 */







function text(options) {
  options = options || {};
  return function textParser(req, res, next) {
    req.body = req.body || {}
    debug('content-type %s', JSON.stringify(req.headers['content-type']))
  }
}
