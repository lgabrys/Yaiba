const assert = require('assert');
const getSetup = require('./support/setup');
const request = require('./support/client');
describe('request', function () {
  let setup;
  let uri;
  before(async () => {
    setup = await getSetup();
    uri = setup.uri;
  });
  describe('.end()', () => {
    it('called only once with a promise', () => {
      const request_ = request.get(`${uri}/unique`);
      return Promise.all([request_, request_, request_]).then((results) => {
        for (const item of results) {
          assert.equal(
          );
        }
      });
    });
  });
});
