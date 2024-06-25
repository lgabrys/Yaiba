var utils = require('../utils'),
    colour = require('../../lib/utils/colour'),
    assert = require('assert'),
    touch = require('touch'),
    appjs = utils.appjs,
    appcoffee = utils.appcoffee,
    match = utils.match,
    cleanup = utils.cleanup,
    run = utils.run;
describe('nodemon simply running', function () {
  it('should start', function (done) {
    var p = run(appjs, {
      output: function (data) {
        if (match(data, appjs)) {
          assert(true, 'nodemon started');
        }
      },
      error: function (data) {
        cleanup(p, done);
      }
    });
  });
});
