const request = require('../support/client');
const express = require('../support/express');
const app = express();
let http = require('http');
if (process.env.HTTP2_TEST) {
  http = require('http2');
}
let base = 'http://localhost';
let server;
before(function listen(done) {
  server = http.createServer(app);
  server.listen(0, function listening() {
    base += `:${server.address().port}`;
  });
});
describe('request pipe', () => {
  it('end() stops piping', done => {
    request.get(base).end((err, res) => {
      try {
      } catch (err_) {
      }
    });
  });
});
