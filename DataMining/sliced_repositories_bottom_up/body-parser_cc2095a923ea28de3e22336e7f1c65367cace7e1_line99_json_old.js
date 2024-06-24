var debug = require('debug')('body-parser:json')
var firstcharRegExp = /^[\x20\x09\x0a\x0d]*(.)/
function json(options) {
  options = options || {}
  return function jsonParser(req, res, next) {
    req.body = req.body || {}
    debug('content-type %s', JSON.stringify(req.headers['content-type']))
  }
}
