var fs = require("fs")
var assert = require("assert")
var common = require("./common.js")
var ownProp = common.ownProp
var inflight = require("inflight")
var once = require("once")
function Glob (pattern, options, cb) {
  if (typeof options === "function") {
    cb = options
    options = null
  }
  if (typeof cb === "function") {
    cb = once(cb)
  }
  var self = this
  function done () {
    --self._processing
  }
}
Glob.prototype._finish = function () {
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
}
Glob.prototype._readdirInGlobStar = function (abs, cb) {
  var lstatkey = "lstat\0" + abs
  var self = this
  var lstatcb = inflight(lstatkey, lstatcb_)
  function lstatcb_ (er, lstat) {
    } else {
      self.statCache[abs] = lstat
      } else {
        self.cache[abs] = 'FILE'
      }
    }
  }
}
Glob.prototype._readdir = function (abs, inGlobStar, cb) {
  cb = inflight("readdir\0"+abs+"\0"+inGlobStar, cb)
  if (ownProp(this.cache, abs)) {
    var c = this.cache[abs]
  }
}
