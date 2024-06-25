var fs = require('fs'),
    childProcess = require('child_process'),
    spawn = childProcess.spawn,
    program = getNodemonArgs(),
    child = null,
    platform = process.platform,
    noWatch = (platform !== 'win32') || !fs.watch, //  && platform !== 'linux' - removed linux fs.watch usage #72
function startNode() {
  child = spawn(program.options.exec, program.args);
  child.stderr.on('data', function (data) {
    process.stderr.write(data);
  });
}
