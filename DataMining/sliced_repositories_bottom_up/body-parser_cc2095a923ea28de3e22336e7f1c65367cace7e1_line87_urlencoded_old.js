var contentType = require('content-type')
var debug = require('debug')('body-parser:urlencoded')
var deprecate = require('depd')('body-parser')
var read = require('../read')
var typeis = require('type-is')

/**
 * Module exports.
 */



module.exports = urlencoded

/**
 * Cache of parser modules.
 */



var parsers = Object.create(null)

/**
 * Create a middleware to parse urlencoded bodies.
 *
 * @param {object} [options]
 * @return {function}
 * @api public
 */







function urlencoded(options){
  options = options || {};
  return function urlencodedParser(req, res, next) {
    req.body = req.body || {}
    debug('content-type %s', JSON.stringify(req.headers['content-type']))
  }
}
