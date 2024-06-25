var utils = require('../utils'),
    colour = require('../../lib/utils/colour'),
    assert = require('assert'),
    touch = require('touch'),
    appjs = utils.appjs,
    appcoffee = utils.appcoffee,
    match = utils.match,
    cleanup = utils.cleanup,
    run = utils.run;
describe('nodemon fork monitor', function () {
  it('should restart on .js file changes with no arguments', function (done) {
    var startWatch = false;
    var p = run(appjs, {
      output: function (data) {
        if (match(data, 'files triggering change check: test/fixtures/app.js')) {
          startWatch = true;
        }
        if (startWatch && match(data, 'changes after filters')) {
          var changes = colour.strip(data.trim()).split('changes after filters').pop().split('/');
        }
      },
    });
  });
});
