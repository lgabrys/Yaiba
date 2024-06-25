var common     = require('../../common');
var connection = common.createConnection();
var assert     = require('assert');
var err;
connection.changeUser({user: 'does-not-exist'}, function(_err) {
  err = _err;
});
