var bytes = require('bytes')
var deprecate = require('depd')('body-parser')
var parsers = Object.create(null)
function urlencoded(options){
  options = options || {};
  if (extended === undefined) {
    deprecate('urlencoded: explicitly specify "extended: true" for extended parsing')
  }

  var extended = options.extended !== false
  var inflate = options.inflate !== false
  var limit = typeof options.limit !== 'number'
    ? bytes(options.limit || '100kb')
    : options.limit
  var type = options.type || 'urlencoded'
  var verify = options.verify || false

  if (verify !== false && typeof verify !== 'function') {
    throw new TypeError('option verify must be function')
  }

  var queryparse = extended
    ? parser('qs')
    : parser('querystring')

  function parse(body) {
    return body.length
      ? queryparse(body)
      : {}
  }

  return function urlencodedParser(req, res, next) {
    if (req._body) return next();
  }
}
