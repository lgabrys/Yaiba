(function() {
  var _global = this;
  var mathRNG, nodeRNG, whatwgRNG;
  mathRNG = function() {
  }
  if (_global.crypto && crypto.getRandomValues) {
    whatwgRNG = function() {
    }
  }
  try {
    var _rb = require('crypto').randomBytes;
    nodeRNG = _rb && function() {
    };
  } catch (e) {}
}());
