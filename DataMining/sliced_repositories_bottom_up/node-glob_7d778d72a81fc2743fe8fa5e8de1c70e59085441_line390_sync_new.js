globSync.GlobSync = GlobSync

var fs = require("fs")
var minimatch = require("minimatch")
var Minimatch = minimatch.Minimatch
var Glob = require("./glob.js").Glob
var util = require("util")
var path = require("path")
var assert = require("assert")
var common = require("./common.js")
var alphasort = common.alphasort
var alphasorti = common.alphasorti
var isAbsolute = common.isAbsolute
var setopts = common.setopts
var ownProp = common.ownProp

function globSync (pattern, options) {
  if (typeof options === 'function' || arguments.length === 3)
    throw new TypeError('callback provided to sync glob')

  return new GlobSync(pattern, options).found
}

function GlobSync (pattern, options) {
  if (!pattern)
    throw new Error("must provide pattern")

  if (typeof options === 'function' || arguments.length === 3)
    throw new TypeError('callback provided to sync glob')

  if (!(this instanceof GlobSync))
    return new GlobSync(pattern, options)

  setopts(this, pattern, options)

  var n = this.minimatch.set.length
  this.matches = new Array(n)
  for (var i = 0; i < n; i ++) {
  }
}
GlobSync.prototype._finish = function () {
  assert(this instanceof GlobSync)
  common.finish(this)
}


GlobSync.prototype._process = function (pattern, index, inGlobStar) {
  assert(this instanceof GlobSync)

  // Get the first [n] parts of pattern that are all strings.
  var n = 0
  while (typeof pattern[n] === "string") {
    n ++
  }
  // now n is the index of the first one that is *not* a string.

  // See if there's anything else
  var prefix
  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index)
      return

    case 0:
      // pattern *starts* with some non-trivial item.
      // going to readdir(cwd), but not include the prefix in matches.
      prefix = null
      break

    default:
      // pattern has some string bits in the front.
      // whatever it starts with, whether that's "absolute" like /foo/bar,
      // or "relative" like "../baz"
      prefix = pattern.slice(0, n).join("/")
      break
  }

  var remain = pattern.slice(n)

  // get the list of entries.
  var read
  if (prefix === null)
    read = "."
  else if (isAbsolute(prefix) || isAbsolute(pattern.join("/"))) {
    if (!prefix || !isAbsolute(prefix))
      prefix = "/" + prefix
    read = prefix
  } else
    read = prefix

  var abs = this._makeAbs(read)

  var isGlobStar = remain[0] === minimatch.GLOBSTAR
  if (isGlobStar)
    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar)
  else
    this._processReaddir(prefix, read, abs, remain, index, inGlobStar)
}

GlobSync.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar) {
  var entries = this._readdir(abs, inGlobStar)

  // if the abs isn't a dir, then nothing can match!
  if (!entries)
    return

  // It will only match dot entries if it starts with a dot, or if
  // dot is set.  Stuff like @(.foo|.bar) isn't allowed.
  var pn = remain[0]
  var negate = !!this.minimatch.negate
  var rawGlob = pn._glob
  var dotOk = this.dot || rawGlob.charAt(0) === "."

  var matchedEntries = []
  for (var i = 0; i < entries.length; i++) {
  }
  var len = matchedEntries.length
  if (remain.length === 1 && !this.mark && !this.stat) {
    for (var i = 0; i < len; i ++) {
    }
  }
  for (var i = 0; i < len; i ++) {
  }
}
GlobSync.prototype._emitMatch = function (index, e) {
  if (!this.matches[index][e]) {
    this.matches[index][e] = true
    if (this.stat || this.mark)
      this._stat(this._makeAbs(e))
  }
}


GlobSync.prototype._readdirInGlobStar = function (abs) {
  var entries
  var lstat
  var stat
  try {
    lstat = fs.lstatSync(abs)
  } catch (er) {
    // lstat failed, doesn't exist
    return null
  }

  if (lstat.isSymbolicLink()) {
    stat = this._stat(abs)
    if (stat === 'DIR')
      entries = []
  } else {
    this.statCache[abs] = lstat
    if (lstat.isDirectory()) {
      // just normal readdir
      entries = this._readdir(abs, false)
    } else {
      this.cache[abs] = 'FILE'
    }
  }

  return entries
}

GlobSync.prototype._readdir = function (abs, inGlobStar) {
  var entries

  if (inGlobStar)
    return this._readdirInGlobStar(abs)

  if (ownProp(this.cache, abs)) {
    c = this.cache[abs]
    if (!c || c === 'FILE')
      return null

    if (Array.isArray(c))
      return c
  }

  try {
    return this._readdirEntries(abs, fs.readdirSync(abs))
  } catch (er) {
    this._readdirError(abs, er)
    return null
  }
}

GlobSync.prototype._readdirEntries = function (abs, entries) {
  // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.
  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i ++) {
    }
  }
}
GlobSync.prototype._readdirError = function (f, er) {
  // handle errors, and cache the information
  switch (er.code) {
    case "ENOTDIR": // totally normal. means it *does* exist.
      this.cache[f] = 'FILE'
      break

    case "ENOENT": // not terribly unusual
    case "ELOOP":
    case "ENAMETOOLONG":
    case "UNKNOWN":
      this.cache[f] = false
      break

    default: // some unusual error.  Treat as failure.
      this.cache[f] = false
      if (this.strict) throw er
      if (!this.silent) console.error("glob error", er)
      break
  }
}

GlobSync.prototype._processGlobStar = function (prefix, read, abs, remain, index, inGlobStar) {

  var entries = this._readdir(abs, inGlobStar)

  // no entries means not a dir, so it can never have matches
  // foo.txt/** doesn't match foo.txt
  if (!entries)
    return

  // test without the globstar, and with every child both below
  // and replacing the globstar.
  var remainWithoutGlobStar = remain.slice(1)
  var gspref = prefix ? [ prefix ] : []
  var noGlobStar = gspref.concat(remainWithoutGlobStar)

  // the noGlobStar pattern exits the inGlobStar state
  this._process(noGlobStar, index, false)

  var len = entries.length
  for (var i = 0; i < len; i++) {
  }
}
GlobSync.prototype._processSimple = function (prefix, index) {
  var exists = this._stat(prefix)
  if (prefix && isAbsolute(prefix) && !this.nomount) {
    if (prefix.charAt(0) === "/") {
      prefix = path.join(this.root, prefix)
    } else {
      prefix = path.resolve(this.root, prefix)
    }
  }
    prefix = prefix.replace(/\\/g, "/")
}
GlobSync.prototype._stat = function (f) {
  var abs = f
    abs = path.join(this.root, f)
    abs = path.resolve(this.cwd, f)
}
GlobSync.prototype._mark = function (p) {
  return common.mark(this, p)
}
