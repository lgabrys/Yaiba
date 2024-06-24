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
    nodeRNG = function() {
    };
  } catch (e) {}
}());
