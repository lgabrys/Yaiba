var Transform = require('readable-stream/transform')
  , inherits  = require('util').inherits
function DestroyableTransform(opts) {
}
DestroyableTransform.destroy = function(err) {
}
