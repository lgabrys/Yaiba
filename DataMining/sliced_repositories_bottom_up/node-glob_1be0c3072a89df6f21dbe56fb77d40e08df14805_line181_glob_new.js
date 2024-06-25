, minimatch = require("minimatch")
, Minimatch = minimatch.Minimatch
function Glob (pattern, options, cb) {
  options = options || {}
  if (options.matchBase && -1 === pattern.indexOf("/")) {
    pattern = "**/" + pattern
  }
  var mm = this.minimatch = new Minimatch(pattern, options)
  pattern = this.pattern = mm.pattern
}
Glob.prototype._finish = function () {
  var nou = this.nounique
  , all = nou ? [] : {}
  for (var i = 0, l = this.matches.length; i < l; i ++) {
    var matches = this.matches[i]
    if (!matches) {
      if (this.nonull) {
        var literal = this.minimatch.globSet[i]
        else all[literal] = true
      }
    } else {
  }
}
