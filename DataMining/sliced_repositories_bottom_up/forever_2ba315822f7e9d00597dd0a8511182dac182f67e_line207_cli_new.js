


    path = require('path'),
    flatiron = require('flatiron'),
    forever = require('../forever');
var cli = exports;
var help = [
];
var app = flatiron.app;
var argvOptions = cli.argvOptions = {
};
app.use(flatiron.plugins.cli, {
  argv: argvOptions,
  usage: help
});
var reserved = ['root', 'pidPath'];
function tryStart(file, options, callback) {
  var fullLog, fullScript;
  fullLog = forever.logFilePath(options.logFile, options.uid);
  fullScript = path.join(options.sourceDir, file);
  forever.stat(fullLog, fullScript, options.append, function (err) {
  });
}
var getOptions = cli.getOptions = function (file) {
  var options = {};
  options.options = process.argv.splice(process.argv.indexOf(file) + 1);
  app.config.stores.argv.store = {};
  [
  ].forEach(function (key) {
    options[key] = app.config.get(key);
  });
  options.watchIgnore         = options.watchIgnore || [];
  options.watchIgnorePatterns = Array.isArray(options.watchIgnore)
}
