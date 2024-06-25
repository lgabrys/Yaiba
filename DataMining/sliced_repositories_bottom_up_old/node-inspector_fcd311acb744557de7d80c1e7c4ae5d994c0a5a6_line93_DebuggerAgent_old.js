  launcher = require('./helpers/launcher.js'),
  DebuggerAgent = require('../lib/DebuggerAgent.js').DebuggerAgent;
describe('DebuggerAgent', function() {
  describe('sets variable value', function() {
    var debuggerClient, agent;
    function setupDebugScenario(done) {
      launcher.runOnBreakInFunction(function(client) {
        debuggerClient = client;
        agent = new DebuggerAgent({}, null, debuggerClient, null, null);
      });
    }
    function to(type, test) {
    }
    function toRefType(type, newValueExpression, expectedResultCb) {
      to(type, function(done) {
        debuggerClient.fetchObjectId(agent, newValueExpression, function(valueId) {
          verifyVariableSetter(
            { handle: valueId },
          );
        });
      });
    }
  });
});
