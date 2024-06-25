  format = require('util').format,
  path = require('path'),
  async = require('async'),
  ScriptFileStorage = require('./ScriptFileStorage').ScriptFileStorage;
function DebuggerAgent(config,
                       frontendClient,
                       debuggerClient,
                       breakEventHandler,
                       scriptManager) {
  this._saveLiveEdit = config.saveLiveEdit;
  this._scriptStorage = new ScriptFileStorage(config);
}
