var cli = require('../../lib/cli/'),
  exec = require('../../lib/config/exec'),
  pkg = require('../../package'),
  assert = require('assert'),
  command = require('../../lib/config/command'),
  utils = require('../../lib/utils');
function asCLI(cmd) {
  return ('node nodemon ' + (cmd || '')).trim();
}
function parse(cmd) {
  var parsed = cli.parse(cmd);
  parsed.execOptions = exec({
  });
}
function commandToString(command) {
}
describe('nodemon CLI parser', function () {
  it('should support stand alone `nodemon` command', function () {
    var settings = parse(asCLI(''));
    assert(settings.execOptions.script === pkg.main + '.js', `${settings.execOptions.script} === ${pkg.main}`);
  });
});
