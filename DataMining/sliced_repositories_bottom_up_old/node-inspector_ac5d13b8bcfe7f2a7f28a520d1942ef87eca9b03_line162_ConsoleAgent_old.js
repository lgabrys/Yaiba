    launcher = require('./helpers/launcher.js'),
    inherits = require('util').inherits,
    EventEmitter = require('events').EventEmitter,
    InjectorClient = require('../lib/InjectorClient').InjectorClient,
    ConsoleClient = require('../lib/ConsoleClient').ConsoleClient,
    ConsoleAgent = require('../lib/ConsoleAgent').ConsoleAgent;
var consoleAgent,
    consoleClient,
    childProcess,
    debuggerClient,
    frontendClient;
function initializeConsole(done) {
  launcher.runCommandlet(true, function(child, session) {
    childProcess = child;
    debuggerClient = session.debuggerClient;
    frontendClient = session.frontendClient;
    var injectorClient = new InjectorClient({}, session);
    session.injectorClient = injectorClient;
    consoleClient = new ConsoleClient({}, session);
    session.consoleClient = consoleClient;
    consoleAgent = new ConsoleAgent({}, session);
    consoleAgent.enable({}, injectorClient.inject.bind(injectorClient));
  });
}
