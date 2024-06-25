var exec = require('../../lib/config/exec'),
    command = require('../../lib/config/command'),
    assert = require('assert');
describe('nodemon exec', function () {
  it('should support coffeescript in debug mode', function () {
    var options = exec({ script: 'app.coffee', nodeArgs: [ '--debug' ] });
    assert(options.execArgs[1].indexOf('--debug') !== -1);
  });
});
