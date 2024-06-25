var assume = require('assume'),
    winston = require('../lib/winston');
describe('Container', function () {
  describe('no transports', function () {
    var container = new winston.Container();
    it('.close(default-test)', function () {
      assume(container.loggers['default-test']).falsy();
    });
  });
});
