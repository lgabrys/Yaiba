const request = require('../support/client');
const express = require('../support/express');
const app = express();
let http = require('http');
if (process.env.HTTP2_TEST) {
  http = require('http2');
}
app.get('/', (request_, res) => {
});
let base = 'http://localhost';
let server;
before(function listen(done) {
  server = http.createServer(app);
  server = server.listen(0, function listening() {
    base += `:${server.address().port}`;
  });
});
describe('res.toError()', () => {
  it('should return an Error', (done) => {
    request.get(base).end((error, res) => {
    });
  });
});
