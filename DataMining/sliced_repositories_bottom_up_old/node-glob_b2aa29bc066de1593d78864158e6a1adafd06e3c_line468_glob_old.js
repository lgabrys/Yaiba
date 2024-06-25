var fs = require('fs')
var rp = require('fs.realpath')
var assert = require('assert')
var common = require('./common.js')
var inflight = require('inflight')
var isIgnored = common.isIgnored
var once = require('once')
function Glob (pattern, options, cb) {
  if (typeof options === 'function') {
    cb = options
    options = null
  }
  if (typeof cb === 'function') {
    cb = once(cb)
  }
  var self = this
  function done () {
    --self._processing
  }
}
Glob.prototype._finish = function () {
}
Glob.prototype._realpath = function () {
  var n = this.matches.length
  var self = this
  for (var i = 0; i < this.matches.length; i++)
  function next () {
    if (--n === 0)
  }
}
Glob.prototype._realpathSet = function (index, cb) {
  var matchset = this.matches[index]
  var found = Object.keys(matchset)
  var self = this
  var n = found.length
  var set = this.matches[index] = Object.create(null)
  found.forEach(function (p, i) {
    p = self._makeAbs(p)
    rp.realpath(p, self.realpathCache, function (er, real) {
        set[real] = true
        set[p] = true
      if (--n === 0) {
        self.matches[index] = set
      }
    })
  })
}
Glob.prototype._mark = function (p) {
}
Glob.prototype._makeAbs = function (f) {
}
Glob.prototype.abort = function () {
}
Glob.prototype.pause = function () {
}
Glob.prototype.resume = function () {
  if (this.paused) {
    if (this._processQueue.length) {
      for (var i = 0; i < pq.length; i ++) {
        this._processing--
      }
    }
  }
}
Glob.prototype._process = function (pattern, index, inGlobStar, cb) {
  this._processing++
}
Glob.prototype._processReaddir = function (prefix, read, abs, remain, index, inGlobStar, cb) {
  var self = this
  this._readdir(abs, inGlobStar, function (er, entries) {
  })
}
Glob.prototype._processReaddir2 = function (prefix, read, abs, remain, index, inGlobStar, entries, cb) {
  var pn = remain[0]
  var negate = !!this.minimatch.negate
  var rawGlob = pn._glob
  var dotOk = this.dot || rawGlob.charAt(0) === '.'
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
  var abs = this._makeAbs(e)
}
