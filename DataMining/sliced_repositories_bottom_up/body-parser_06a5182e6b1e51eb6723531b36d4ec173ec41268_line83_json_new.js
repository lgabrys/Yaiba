var firstcharRegExp = /^[\x20\x09\x0a\x0d]*(.)/
function json(options) {
  var opts = options || {}
  var strict = opts.strict !== false
  function parse(body) {
    if (strict) {
      var first = firstchar(body)
      if (first !== '{' && first !== '[') {
        throw new SyntaxError('Unexpected token ' + first)
      }
    }
  }
}
