var MODULE_WRAP_REGEX = new RegExp(
);
function ScriptFileStorage(config) {
  config = config || {}
  this._isHidden = config.isScriptHidden || function() { return false; };
}
