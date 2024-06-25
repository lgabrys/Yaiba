var fs = require('fs'),
    path = require('path'),
    events = require('events'),
    exec = require('child_process').exec,
    net = require('net'),
    daemon = require('daemon'),
    nconf = require('nconf'),
    psTree = require('ps-tree'),
    utile = require('utile'),
    mkdirp = utile.mkdirp,
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
function getSockets(sockPath, callback) {
  var sockets;
  try {
    sockets = fs.readdirSync(sockPath);
  }
}
function getAllProcesses(callback) {
}
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
      results = [],
      pids;
  getAllProcesses(function (processes) {
    var procs = forever.findByIndex(target, processes)
    if (procs && procs.length > 0) {
      pids = procs.reduce(function (agg, proc) {
      }, []);
    }
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
        if (proc.command) {
          restartCommand.push('-c', proc.command);
        }
      });
    }
  });
};
