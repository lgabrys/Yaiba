var Transform = require('readable-stream/transform')
  , xtend     = require('xtend')
function through2 (construct) {
}
module.exports = through2(function (options, transform, flush) {
  var t2 = new Transform(options)
  t2._transform = transform
    t2._flush = flush
})
module.exports.ctor = through2(function (options, transform, flush) {
  function Through2 (override) {
  }
  Through2.prototype._transform = transform
    Through2.prototype._flush = flush
})
module.exports.obj = through2(function (options, transform, flush) {
  var t2 = new Transform(xtend({ objectMode: true }, options))
})
