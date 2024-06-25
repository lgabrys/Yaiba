var debug = require('debug')('body-parser:raw')
var read = require('../read')
var typeis = require('type-is')

/**
 * Module exports.
 */



module.exports = raw

/**
 * Create a middleware to parse raw bodies.
 *
 * @param {object} [options]
 * @return {function}
 * @api public
 */







function raw(options) {
  options = options || {};
  return function rawParser(req, res, next) {
    req.body = req.body || {}
    debug('content-type %j', req.headers['content-type'])
  }
}
