var common = require('../../common');
var assert = require('assert');
(function() {
  var cluster = common.createPoolCluster({
    removeNodeErrorCount: 1
  });
  cluster.of('*', 'RR').getConnection(function (err, connection) {
    assert.ok(err === null);
  });
})();
