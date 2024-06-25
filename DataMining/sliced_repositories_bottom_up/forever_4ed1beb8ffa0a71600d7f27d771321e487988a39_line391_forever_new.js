



var fs = require('fs'),
    path = require('path'),
    events = require('events'),
    exec = require('child_process').exec,
    spawn = require('child_process').spawn,
    cliff = require('cliff'),
    nconf = require('nconf'),
    nssocket = require('nssocket'),
    portfinder = require('portfinder'),
    psTree = require('ps-tree'),
    timespan = require('timespan'),
    utile = require('utile'),
    winston = require('winston'),
    mkdirp = utile.mkdirp,
    async = utile.async;
var forever = exports;
//
forever.log = new (winston.Logger)({
  transports: [
    new (winston.transports.Console)()
  ]
});
forever.initialized = false;
forever.plugins     = utile.requireDirLazy(path.join(__dirname, '/forever/plugins'));
forever.root        = path.join(process.env.HOME || '/root', '.forever');
forever.config      = new nconf.File({ file: path.join(forever.root, 'config.json') });
forever.Forever     = forever.Monitor = require('./forever/monitor').Monitor;
forever.Worker      = require('./forever/worker').Worker;
forever.cli         = require('./forever/cli');
function getSockets(sockPath, callback) {
  var sockets;
  try {
    sockets = fs.readdirSync(sockPath);
  }
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
  forever.config = new nconf.File({ file: path.join(options.root, 'config.json') });
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
  if (!options.uid) {
    options.uid = options.uid || utile.randomString(4).replace(/^\-/, '_');
  }
  if (!options.logFile) {
    options.logFile = forever.logFilePath(options.uid + '.log');
  }
};
forever.startDaemon = function (script, options) {
  options         = options || {};
  options.uid     = options.uid || utile.randomString(4).replace(/^\-/, '_');
  options.logFile = forever.logFilePath(options.logFile || options.uid + '.log');
  options.pidFile = forever.pidFilePath(options.pidFile || options.uid + '.pid');
  var monitor, outFD, errFD, workerPath;
  outFD = fs.openSync(options.logFile, 'a');
  errFD = fs.openSync(options.logFile, 'a');
  monitorPath = path.resolve(__dirname, '..', 'bin', 'monitor');
  monitor = spawn(process.execPath, [ monitorPath, script ], {
  });
};
