    util = require('util'),
    path = require('path'),
    flatiron = require('flatiron'),
    cliff = require('cliff'),
    tty = require('tty'),
    daemon = require('daemon'),
    forever = require('../forever');
var cli = exports;
var help = [
  'usage: forever [action] [options] SCRIPT [script-options]',
  '',
  'Monitors the script specified in the current process or as a daemon',
  '',
  'actions:',
  '  start               Start SCRIPT as a daemon',
  '  stop                Stop the daemon SCRIPT',
  '  stopall             Stop all running forever scripts',
  '  restart             Restart the daemon SCRIPT',
  '  list                List all running forever scripts',
  '  config              Lists all forever user configuration',
  '  set <key> <val>     Sets the specified forever config <key>',
  '  clear <key>         Clears the specified forever config <key>',
  '  logs                Lists log files for all forever processes',
  '  logs <script|index> Tails the logs for <script|index>',
  '  columns add <col>   Adds the specified column to the output in `forever list`',
  '  columns rm <col>    Removed the specified column from the output in `forever list`',
  '  columns set <cols>  Set all columns for the output in `forever list`',
  '  cleanlogs           [CAREFUL] Deletes all historical forever log files',
  '',
  'options:',
  '  -m  MAX          Only run the specified script MAX times',
  '  -l  LOGFILE      Logs the forever output to LOGFILE',
  '  -o  OUTFILE      Logs stdout from child script to OUTFILE',
  '  -e  ERRFILE      Logs stderr from child script to ERRFILE',
  '  -p  PATH         Base path for all forever related files (pid files, etc.)',
  '  -c  COMMAND      COMMAND to execute (defaults to node)',
  '  -a, --append     Append logs',
  '  --pidfile        The pid file',
  '  --sourceDir      The source directory for which SCRIPT is relative to',
  '  --minUptime      Minimum uptime (millis) for a script to not be considered "spinning"',
  '  --spinSleepTime  Time to wait (millis) between launches of a spinning script.',
  '  --plain          Disable command line colors',
  '  -d, --debug      Forces forever to log debug output',
  '  -v, --verbose    Turns on the verbose messages from Forever',
  '  -s, --silent     Run the child script silencing stdout and stderr',
  '  -w, --watch      Watch for file changes',
  '  -h, --help       You\'re staring at it',
  '',
  '[Long Running Process]',
  '  The forever process will continue to run outputting log messages to the console.',
  '  ex. forever -o out.log -e err.log my-script.js',
  '',
  '[Daemon]',
  '  The forever process will run as a daemon which will make the target process start',
  '  in the background. This is extremely useful for remote starting simple node.js scripts',
  '  without using nohup. It is recommended to run start with -o -l, & -e.',
  '  ex. forever start -l forever.log -o out.log -e err.log my-daemon.js',
  '      forever stop my-daemon.js',
  ''
];
var app = flatiron.app;
var reserved = ['root', 'pidPath'];
function tryStart(file, options, callback) {
}
function updateConfig(updater) {
}
function checkColumn(name) {
}
function getOptions(file) {
}
app.cmd(/start (.+)/, cli.startDaemon = function (file) {
  forever.log.info('Forever processing file: ' + file.grey);
});
app.cmd(/stop (.+)/, cli.stop = function (file) {
  var runner = forever.stop(file, true);
  runner.on('stop', function (process) {
  });
});
app.cmd('stopall', cli.stopall = function () {
  var runner = forever.stopAll(true);
  runner.on('stopAll', function (processes) {
  });
});
app.cmd(/restart (.+)/, cli.restart = function (file) {
  var runner = forever.restart(file, true);
  runner.on('restart', function (processes) {
  });
});
app.cmd('list', cli.list = function () {
  forever.list(true, function (err, processes) {
    if (processes) {
      forever.log.info('Forever processes running');
    }
  });
});
app.cmd('config', cli.config = function () {
  var keys = Object.keys(forever.config.store),
      conf = cliff.inspect(forever.config.store);
  if (keys.length <= 2) {
    conf = conf.replace(/\{\s/, '{ \n')
  }
  else {
    conf = conf.replace(/\n\s{4}/ig, '\n  ');
  }
});
app.cmd('set :key :value', cli.set = function (key, value) {
  updateConfig(function () {
    forever.log.info('Setting forever config: ' + key.grey);
  });
});
app.cmd('clear :key', cli.clear = function (key) {
  if (reserved.indexOf(key) !== -1) {
    forever.log.warn('Cannot clear reserved config: ' + key.grey);
  }
});
app.cmd('logs :index', cli.logs = function (index) {
  //
  // Helper function for listing all log files
  //
  function listFiles() {
    var index = 0,
        rows = [['   ', 'script', 'logfile']];
    forever.list(false, function (err, processes) {
      rows = rows.concat(processes.map(function (proc) {
        return ['[' + index++ + ']', proc.file.grey, proc.logFile.magenta];
      }));
    });
  }
});
app.cmd('columns add :name', cli.addColumn = function (name) {
  if (checkColumn(name)) {
    var columns = forever.config.get('columns');
  }
});
app.cmd('columns rm :name', cli.rmColumn = function (name) {
  if (checkColumn(name)) {
    var columns = forever.config.get('columns');
  }
});
app.cmd('columns set :value', cli.setColumns = function (value) {
  forever.log.info('Setting columns: ' + value.join(' ').magenta);
  columns = value;
});
app.cmd('help', cli.help = function () {
  util.puts(help.join('\n'));
});
app.cmd(/(.+)/, cli.start = function (file) {
  var options = getOptions(file);
});
