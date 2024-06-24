var events = require('events'),
    DebuggerClient = require('./DebuggerClient').DebuggerClient,
    ScriptManager = require('./ScriptManager').ScriptManager,
    FrontendClient = require('./FrontendClient').FrontendClient,
    FrontendCommandHandler = require('./FrontendCommandHandler').FrontendCommandHandler,
exports.create = function(debuggerPort, config) {
  var sessionInstance,
      scriptManager,
      frontendClient,
      debuggerClient,
  function onDebuggerClientError(e) {
    var err = e.toString();
    if (e.helpString) {
      err += '\n' + e.helpString;
    }
    frontendClient.sendLogToConsole('error', err);
  }
  function onInjectorClientError(e) {
  }
  sessionInstance = Object.create(events.EventEmitter.prototype, {
    close: {
      {
        debuggerClient.close();
      }
    },
    join: {
      value: function(wsConnection) {
        frontendClient = new FrontendClient(wsConnection);
        debuggerClient = new DebuggerClient(debuggerPort);
        scriptManager = new ScriptManager(
          config.isScriptHidden,
        );
      }
    }
  });
};
