var fs = require('fs'),
    util = require('util'),
    childProcess = require('child_process'),
    dirs = [],
    path = require('path'),
    exists = fs.exists || path.exists, // yay, exists moved from path to fs in 0.7.x ... :-\
    existsSync = fs.existsSync || path.existsSync,

    spawn = childProcess.spawn,
    meta = JSON.parse(fs.readFileSync(__dirname + '/package.json')),
    exec = childProcess.exec,
    flag = './.monitor',
    program = getNodemonArgs(),
    child = null,
    monitor = null,
    ignoreFilePath = './.nodemonignore',
    oldIgnoreFilePath = './nodemon-ignore',
    ignoreFiles = [],
    reIgnoreFiles = null,
    timeout = 1000, // check every 1 second
    restartDelay = 0, // controlled through arg --delay 10 (for 10 seconds)
    restartTimer = null,
    lastStarted = +new Date,
    statOffset = 0, // stupid fix for https://github.com/joyent/node/issues/2705
    platform = process.platform,
    isWindows = platform === 'win32',
    noWatch = (platform !== 'win32') || !fs.watch, //  && platform !== 'linux' - removed linux fs.watch usage #72
    // create once, reuse as needed
    reEscComments = /\\#/g,
    reUnescapeComments = /\^\^/g, // note that '^^' is used in place of escaped comments
    reComments = /#.*$/,
    reTrim = /^(\s|\u00A0)+|(\s|\u00A0)+$/g,
    reEscapeChars = /[.|\-[\]()\\]/g,
    reAsterisk = /\*/g;
function startNode() {
  child = spawn(program.options.exec, program.args);
  lastStarted = +new Date;
  child.stderr.on('data', function (data) {
    util.error(data);
  });
}
