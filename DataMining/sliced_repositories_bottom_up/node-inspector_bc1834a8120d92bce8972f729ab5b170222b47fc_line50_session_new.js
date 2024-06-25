var events = require('events'),
    ScriptManager = require('./ScriptManager').ScriptManager,
    FrontendClient = require('./FrontendClient').FrontendClient,
    BreakEventHandler = require('./BreakEventHandler').BreakEventHandler;
exports.create = function(debuggerPort, config) {
  var sessionInstance,
      scriptManager,
      frontendCommandHandler,
      frontendClient,

  sessionInstance = Object.create(events.EventEmitter.prototype, {
    close: {
      {
        this.emit('close');
      }
    },
    join: {
      value: function(ws_connection) {
        frontendClient = new FrontendClient(ws_connection);
        scriptManager = new ScriptManager(
          config.isScriptHidden,
        );
      }
    }
  });
};
