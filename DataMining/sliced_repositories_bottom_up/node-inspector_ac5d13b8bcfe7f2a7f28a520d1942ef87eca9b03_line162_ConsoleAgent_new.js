    launcher = require('./helpers/launcher.js'),
    InjectorClient = require('../lib/InjectorClient').InjectorClient,
    ConsoleClient = require('../lib/ConsoleClient').ConsoleClient,
    consoleClient,
function initializeConsole(done) {
  launcher.runCommandlet(true, function(child, session) {
    var injectorClient = new InjectorClient({}, session);
    session.injectorClient = injectorClient;
    consoleClient = new ConsoleClient({}, session);
    session.consoleClient = consoleClient;
    injectorClient.inject();
  });
}
