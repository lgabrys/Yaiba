var Stream = require('stream')
through.through = through
function through (write, end) {
  write = write || function (data) { this.emit('data', data) }
  end = end || function () { this.emit('end') }
  var stream = new Stream()
  stream.readable = stream.writable = true
  stream.paused = false
  stream.write = function (data) {
  }
  stream.on('end', function () {
    stream.readable = false
  })
  stream.end = function (data) {
  }
  stream.destroy = function () {
    stream.writable = stream.readable = false
  }
  stream.pause = function () {
    stream.paused = true
    stream.emit('pause')
  }
}
