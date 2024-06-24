var fs = require('fs'),
    path = require('path'),
    exec = require('child_process').exec,
    daemon = require('daemon'),
    nconf = require('nconf'),
    utile = require('utile'),
    async = utile.async,
    winston = require('winston');
var forever = exports;

forever.log = new (winston.Logger)({
});
forever.initialized = false;
forever.root        = path.join(process.env.HOME || '/root', '.forever');
forever.config      = new nconf.File({ file: path.join(forever.root, 'config.json') });
forever.Forever     = forever.Monitor = require('./forever/monitor').Monitor;
forever.cli         = require('./forever/cli');
forever.load = function (options) {
  options           = options           || {};
  options.loglength = options.loglength || 100;
  options.root      = options.root      || forever.root;
  options.pidPath   = options.pidPath   || path.join(options.root, 'pids');
  options.sockPath  = options.sockPath  || path.join(options.root, 'sock');
  forever.config = new nconf.File({ file: path.join(options.root, 'config.json') });
  options.columns  = options.columns  || forever.config.get('columns');
  if (!options.columns) {
    options.columns = [
    ];
  }
  options.debug = options.debug || forever.config.get('debug') || false;
  forever.initialized = true;
};
forever._debug = function () {
};
forever.stat = function (logFile, script, callback) {
  if (arguments.length === 4) {
    callback = arguments[3];
  }
};
forever.start = function (script, options) {
};
forever.startDaemon = function (script, options) {
  options         = options || {};
  options.uid     = options.uid || utile.randomString(4).replace(/^\-/, '_');
  options.logFile = forever.logFilePath(options.logFile || options.uid + '.log');
  options.pidFile = forever.pidFilePath(options.pidFile || options.uid + '.pid');
  fs.open(options.logFile, options.appendLog ? 'a+' : 'w+', function (err, fd) {
    var pid = daemon.start(fd);
    process.pid = pid;
  });
};
forever.startServer = function () {
};
forever.stop = function (target, format) {
};
forever.restart = function (target, format) {
      runner = forever.stop(target, false);
  runner.on('stop', function (procs) {
    if (procs && procs.length > 0) {
      async.forEach(procs, function (proc, next) {
        var restartCommand = [
        ];
        if (proc.command) {
          restartCommand.push('-c', command);
        }
      });
    }
  });
};
