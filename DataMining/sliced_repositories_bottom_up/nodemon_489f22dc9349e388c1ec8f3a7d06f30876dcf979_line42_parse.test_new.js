var cli = require('../../lib/cli/'),
    exec = require('../../lib/config/exec'),
    pkg = require('../../package'),
    assert = require('assert'),
    command = require('../../lib/config/command'),
    utils = require('../../lib/utils');
function asCLI(cmd) {
  return ('node nodemon ' + (cmd|| '')).trim();
}
function parse(cmd) {
  var parsed = cli.parse(cmd);
  parsed.execOptions = exec({
  });
}
function commandToString(command) {
  return utils.stringify(command.executable, command.args);
}
describe('nodemon CLI parser', function () {
  it('should support --debug with script detect via package', function () {
    var settings = parse(asCLI('--debug'));
    var cmd = commandToString(command(settings));
    assert(cmd === 'node --debug ./bin/www');
  });
});
