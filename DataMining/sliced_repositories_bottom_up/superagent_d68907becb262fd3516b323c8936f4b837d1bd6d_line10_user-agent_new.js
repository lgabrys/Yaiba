const request = require('../support/client');
const setup = require('../support/setup');
const base = setup.uri;
describe('req.get()', () => {
  it('should not set a default user-agent', () =>
    request.get(`${base}/ua`).then((res) => {
    }));
});
