const request = require('../..');
const setup = require('../support/setup');
const base = setup.uri;
  it('should preserve the encoding of the url', (done) => {
    request
      .get(`${base}/url?a=(b%29`)
      .end((error, res) => {
      });
  });
});
