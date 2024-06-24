var fs = require("fs")
var minimatch = require("minimatch")
var Minimatch = minimatch.Minimatch
var inherits = require("inherits")
var EE = require("events").EventEmitter
var path = require("path")
var assert = require("assert")
var globSync = require("./sync.js")
var common = require("./common.js")
var alphasort = common.alphasort
var alphasorti = common.alphasorti
var isAbsolute = common.isAbsolute
var setopts = common.setopts
var ownProp = common.ownProp
var inflight = require("inflight")

var once = require("once")

function glob (pattern, options, cb) {
  if (typeof options === "function") cb = options, options = {}
  if (!options) options = {}

  if (options.sync) {
    if (cb)
      throw new TypeError('callback provided to sync glob')
    return globSync(pattern, options)
  }

  return new Glob(pattern, options, cb)
}

glob.sync = globSync
var GlobSync = glob.GlobSync = globSync.GlobSync

glob.Glob = Glob
inherits(Glob, EE)
function Glob (pattern, options, cb) {
  if (typeof options === "function") {
    cb = options
    options = null
  }

  if (options && options.sync) {
    if (cb)
      throw new TypeError('callback provided to sync glob')
    return new GlobSync(pattern, options)
  }

  if (!(this instanceof Glob))
    return new Glob(pattern, options, cb)

  setopts(this, pattern, options)

  // process each pattern in the minimatch set
  var n = this.minimatch.set.length

  // The matches are stored as {<filename>: true,...} so that
  // duplicates are automagically pruned.
  // Later, we do an Object.keys() on these.
  // Keep them as a list so we can fill in when nonull is set.
  this.matches = new Array(n)

  if (typeof cb === "function") {
    cb = once(cb)
    this.on("error", cb)
    this.on("end", function (matches) {
      cb(null, matches)
    })
  }

  var self = this
  var n = this.minimatch.set.length
  this._processing = 0
  this.matches = new Array(n)

  this._emitQueue = []
  this._processQueue = []
  this.paused = false

  if (n === 0)
    return done()

  for (var i = 0; i < n; i ++) {
  }
  function done () {
    --self._processing
  }
}
Glob.prototype._finish = function () {
  assert(this instanceof Glob)
  //console.error('FINISH', this.matches)
  common.finish(this)
  this.emit("end", this.found)
}

Glob.prototype._mark = function (p) {
  return common.mark(this, p)
}

Glob.prototype._makeAbs = function (f) {
  return common.makeAbs(this, f)
}

Glob.prototype.abort = function () {
  this.aborted = true
  this.emit("abort")
}

Glob.prototype.pause = function () {
  if (!this.paused) {
    this.paused = true
    this.emit("pause")
  }
}

Glob.prototype.resume = function () {
  if (this.paused) {
    this.emit("resume")
    this.paused = false
    if (this._emitQueue.length) {
      var eq = this._emitQueue.slice(0)
      this._emitQueue.length = 0
      for (var i = 0; i < eq.length; i ++) {
      }
    }
    if (this._processQueue.length) {
      var pq = this._processQueue.slice(0)
      for (var i = 0; i < pq.length; i ++) {
        this._processing--
      }
    }
  }
}
Glob.prototype._process = function (pattern, index, inGlobStar, cb) {
  assert(this instanceof Glob)
  assert(typeof cb === 'function')

  this._processing++
  if (this.paused) {
    this._processQueue.push([pattern, index, inGlobStar, cb])
    return
  }

  //console.error("PROCESS %d", this._processing, pattern)

  if (this.aborted)
    return cb()

  // Get the first [n] parts of pattern that are all strings.
  var n = 0
  while (typeof pattern[n] === "string") {
    n ++
  }
  // now n is the index of the first one that is *not* a string.

  // see if there's anything else
  var prefix
  switch (n) {
    // if not, then this is rather simple
    case pattern.length:
      this._processSimple(pattern.join('/'), index, cb)
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
    this._processGlobStar(prefix, read, abs, remain, index, inGlobStar, cb)
  else
    this._processReaddir(prefix, read, abs, remain, index, inGlobStar, cb)
}


Glob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this
  this._readdir(abs, inGlobStar, function (er, entries) {
    return self._processReaddir2(prefix, read, abs, remain, index, inGlobStar, entries, cb)
  })
}

Glob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {

  // if the abs isn't a dir, then nothing can match!
  if (!entries)
    return cb()

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
Glob.prototype._emitMatch = function (index, e) {
  if (!this.matches[index][e]) {
    if (this.paused) {
      this._emitQueue.push([index, e])
      return
    }
    this.matches[index][e] = true
    if (!this.stat && !this.mark)
      return this.emit("match", e)

    var self = this
    this._stat(this._makeAbs(e), function (er, st) {
      self.emit("stat", e)
      self.emit("match", e)
    })
  }
}

Glob.prototype._readdirInGlobStar = function (abs, cb) {
  var lstatkey = "lstat\0" + abs
  var self = this
  var lstatcb = inflight(lstatkey, lstatcb_)

  if (lstatcb)
    fs.lstat(abs, lstatcb)

  function lstatcb_ (er, lstat) {
    if (er)
      return cb()

    if (lstat.isSymbolicLink()) {
      //console.error('SYMLINK %j', abs)
      self._stat(abs, function (er, stat) {
        return cb(null, stat === 'DIR' ? [] : null)
      })
    } else {
      self.statCache[abs] = lstat
      if (lstat.isDirectory()) {
        // just normal readdir
        self._readdir(abs, false, cb)
      } else {
        self.cache[abs] = 'FILE'
        return cb()
      }
    }
  }
}

Glob.prototype._readdir = function (abs, inGlobStar, cb) {
  cb = inflight("readdir\0"+abs+"\0"+inGlobStar, cb)
  if (!cb) return

  //console.error("RD %j %j", +inGlobStar, abs)
  if (inGlobStar)
    return this._readdirInGlobStar(abs, cb)

  if (ownProp(this.cache, abs)) {
    c = this.cache[abs]
    if (!c || c === 'FILE')
      return cb()

    if (Array.isArray(c))
      return cb(null, c)
  }

  var self = this
  fs.readdir(abs, readdirCb(this, abs, cb))
}

function readdirCb (self, abs, cb) {
  return function (er, entries) {
    if (er)
      self._readdirError(abs, er, cb)
    else
      self._readdirEntries(abs, entries, cb)
  }
}

Glob.prototype._readdirEntries = function (abs, entries, cb) {
  // if we haven't asked to stat everything, then just
  // assume that everything in there exists, so we can avoid
  // having to stat it a second time.
  if (!this.mark && !this.stat) {
    for (var i = 0; i < entries.length; i ++) {
    }
  }
}
