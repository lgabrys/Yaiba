var fs = require('fs'),
    path = require('path'),
    events = require('events'),
    exec = require('child_process').exec,
    net = require('net'),
    async = require('async'),
    colors = require('colors'),
    cliff = require('cliff'),
    daemon = require('daemon'),
    nconf = require('nconf'),
    mkdirp = require('mkdirp').mkdirp,
    portfinder = require('portfinder'),
    timespan = require('timespan'),
    winston = require('winston');
var forever = exports;
//
forever.log = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)()
  ]
});
// Export `version` and important Prototypes from `lib/forever/*`
forever.initialized = false;
forever.root        = path.join(process.env.HOME || '/root', '.forever');
forever.config      = new nconf.stores.File({ file: path.join(forever.root, 'config.json') });
forever.Forever     = forever.Monitor = require('./forever/monitor').Monitor;
forever.cli         = require('./forever/cli');
function getSockets(sockPath, callback) {
  var sockets;
  try {
    sockets = fs.readdirSync(sockPath);
  }
}
function getAllProcesses(callback) {
}
forever.load = function (options) {
  //
  // Setup the incoming options with default options.
  //
  options           = options           || {};
  options.loglength = options.loglength || 100;
  options.root      = options.root      || forever.root;
  options.pidPath   = options.pidPath   || path.join(options.root, 'pids');
  options.sockPath  = options.sockPath  || path.join(options.root, 'sock');
  forever.config = new nconf.stores.File({ file: path.join(options.root, 'config.json') });
  options.columns  = options.columns  || forever.config.get('columns');
  if (!options.columns) {
    options.columns = [
      'uid', 'command', 'script', 'forever', 'pid', 'logfile', 'uptime'
    ];
  }
  options.debug = options.debug || forever.config.get('debug') || false;
  forever.initialized = true;
};
forever._debug = function () {
  var debug = forever.config.get('debug');
};
forever.stat = function (logFile, script, callback) {
  var logAppend;
  if (arguments.length === 4) {
    logAppend = callback;
    callback = arguments[3];
  }
};
forever.start = function (script, options) {
  return new forever.Monitor(script, options).start();
};
forever.startDaemon = function (script, options) {
  options         = options || {};
  options.uid     = options.uid || forever.randomString(24);
  options.logFile = forever.logFilePath(options.logFile || options.uid + '.log');
  options.pidFile = forever.pidFilePath(options.pidFile || options.uid + '.pid');
  fs.open(options.logFile, options.appendLog ? 'a+' : 'w+', function (err, fd) {
    var pid = daemon.start(fd);
    process.pid = pid;
  });
};
forever.startServer = function () {
  var args = Array.prototype.slice.call(arguments),
      socket = path.join(forever.config.get('sockPath'), 'forever.sock'),
      monitors = [],
      callback,
      server;
  args.forEach(function (a) {
    if (Array.isArray(a)) {
      monitors = monitors.concat(a.filter(function (m) {
        return m instanceof forever.Monitor;
      }));
    }
    else if (typeof a === 'function') {
      callback = a;
    }
  });
  server = net.createServer(function (socket) {
  });
};
forever.stop = function (target, format) {
  var emitter = new events.EventEmitter(),
      results = [];
  getAllProcesses(function (processes) {
  });
};
forever.restart = function (target, format) {
  var emitter = new events.EventEmitter(),
      runner = forever.stop(target, false);
  runner.on('stop', function (procs) {
    if (procs && procs.length > 0) {
      async.forEach(procs, function (proc, next) {
        var restartCommand = [
        ];
        exec(restartCommand.join(' '), proc.spawnWith, function (err, stdout, stderr) {
        });
      });
    }
  });
};
