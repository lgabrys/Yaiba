function Sequence(options, callback) {
  if (typeof options === 'function') {
    callback = options;
    options = {};
  }
  options = options || {};
  this._idleTimeout = undefined;
}
