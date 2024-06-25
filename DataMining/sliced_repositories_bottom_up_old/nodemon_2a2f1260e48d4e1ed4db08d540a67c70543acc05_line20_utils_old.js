var fork = require('child_process').fork,
function asCLI(cmd) {
  return {
    exec: 'bin/nodemon.js',
    args: ('-V ' + cmd).trim().split(' ')
  };
}
function match(str, key) {
}
function run(cmd, callbacks) {
  var cli = asCLI(cmd);
}
