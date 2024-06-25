  SessionStub = require('./SessionStub'),
  DebuggerClient = require('../../lib/DebuggerClient').DebuggerClient;
var DEBUG_PORT = 61000;
var Promise = require('promise');
function computeDebugOptions(breakOnStart) {
}
function setupDebugger(instance) {
  instance.session = new SessionStub();
  var debuggerClient = instance.session.debuggerClient = new DebuggerClient('localhost', DEBUG_PORT);
}
