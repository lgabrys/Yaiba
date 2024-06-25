describe('The server', function () {
  var server;
  before('Start running the server', function() {
    server = require('../server');
  });
  after('Shut down the server', function(done) {
    server.close(function () { done(); });
  });
});
