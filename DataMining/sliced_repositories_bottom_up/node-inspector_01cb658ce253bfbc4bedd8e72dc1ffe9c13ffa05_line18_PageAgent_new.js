  path = require('path'),
  async = require('async'),
  convert = require('./convert.js'),
  ScriptFileStorage = require('./ScriptFileStorage.js').ScriptFileStorage;
function PageAgent(config, debuggerClient, scriptManager) {
  this._debuggerClient = debuggerClient;
  this._scriptStorage = new ScriptFileStorage(config);
}
