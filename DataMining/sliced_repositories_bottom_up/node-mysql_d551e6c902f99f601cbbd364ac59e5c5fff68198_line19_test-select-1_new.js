var common     = require('../common');
var connection = common.createConnection({debug: true});
var assert     = require('assert');
var rows = undefined;
connection.query('SELECT 1', function(err, _rows) {
  if (err) throw err;
  rows = _rows;
});
process.on('exit', function() {
  console.log('EXIT', rows);
});
