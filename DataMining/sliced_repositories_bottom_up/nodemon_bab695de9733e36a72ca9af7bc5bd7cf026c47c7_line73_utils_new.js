    assert = require('assert'),
function run(cmd, callbacks) {
  if (callbacks.error) {
  }
}
function cleanup(p, done, err) {
  if (p) {
    p.once('exit', function () {
      p = null;
    });
  }
}
