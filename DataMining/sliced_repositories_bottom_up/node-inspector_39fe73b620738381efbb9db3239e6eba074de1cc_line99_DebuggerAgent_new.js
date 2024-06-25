// node-inspector version of on webkit-inspector/DebuggerAgent.cpp
  format = require('util').format,
  async = require('async'),


function DebuggerAgent(config,
                       frontendClient,
                       scriptManager) {
DebuggerAgent.prototype = {
  enable: function(params, done) {
    this._debuggerClient.on(
      function() {
        this._onDebuggerConnect();
      }.bind(this)
    );
  },
  _onDebuggerConnect: function() {
    async.waterfall([
      //    disconnected from the debugged application
    ]);
  },
  _removeAllBreakpoints: function(done) {
    this._debuggerClient.request(
      function(err, response) {
        if (err) {
          done();
        }


      }.bind(this)
    );
  },
  _reloadScripts: function(done) {
    this._debuggerClient.request(
      {
        includeSource: true,
      },
    );
  },
};
