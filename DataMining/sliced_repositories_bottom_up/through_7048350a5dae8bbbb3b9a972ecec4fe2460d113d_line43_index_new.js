var Stream = require('stream')
through.through = through
function through (write, end, opts) {
  write = write || function (data) { this.queue(data) }
  end = end || function () { this.queue(null) }
  var ended = false, destroyed = false, buffer = [], _ended = false
  var stream = new Stream()
  stream.readable = stream.writable = true
  stream.paused = false
  stream.autoDestroy = !(opts && opts.autoDestroy === false)
  stream.write = function (data) {
  }
  stream.queue = stream.push = function (data) {
    if(data === null) _ended = true
  }
}
