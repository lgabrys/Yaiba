



var fs = require('fs'),
    util = require('util'),
    path = require('path'),
    flatiron = require('flatiron'),
    cliff = require('cliff'),
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
  '  restartall          Restart all running forever scripts',
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
var argvOptions = cli.argvOptions = {
  'command':   {alias: 'c'},
  'errFile':   {alias: 'e'},
  'logFile':   {alias: 'l'},
  'append':    {alias: 'a', boolean: true},
  'max':       {alias: 'm'},
  'outFile':   {alias: 'o'},
  'path':      {alias: 'p'},
  'help':      {alias: 'h'},
  'silent':    {alias: 's', boolean: true},
  'verbose':   {alias: 'v', boolean: true},
  'watch':     {alias: 'w', boolean: true},
  'debug':     {alias: 'd', boolean: true},
  'plain':     {boolean: true}
};
app.use(flatiron.plugins.cli, {
  argv: argvOptions,
  usage: help
});
var actions = [
];
app.config.argv(argvOptions).env();
