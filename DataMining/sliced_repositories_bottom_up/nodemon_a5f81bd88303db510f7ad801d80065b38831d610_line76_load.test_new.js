var load = require('../../lib/config/load'),
    path = require('path'),
    testUtils = require('../utils'),
    utils = require('../../lib/utils'),
    rules = require('../../lib/rules'),
    exec = require('../../lib/config/exec'),
    nodemon = require('../../lib/nodemon'),
    assert = require('assert');
describe('config load', function () {
  var pwd = process.cwd(),
      oldhome = utils.home;
  afterEach(function () {
    utils.home = oldhome;
  });
  beforeEach(function () {
    utils.home = path.resolve(pwd, ['test', 'fixtures', 'global'].join(path.sep));
  });
  it('should support old .nodemonignore', function (done) {
    utils.home = path.resolve(pwd, 'test/fixtures/legacy');
    var config = {},
        settings = {},
        options = {};
    load(settings, options, config, function (config) {
      assert(config.ignore.length === 5, '5 rules found: ' + config.ignore);
      done();
    });
  });
});
