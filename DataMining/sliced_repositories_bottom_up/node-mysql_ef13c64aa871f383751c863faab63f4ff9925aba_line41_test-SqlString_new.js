var common    = require('../../common');
var test      = require('utest');
var assert    = require('assert');
var SqlString = require(common.lib + '/protocol/SqlString');
test('SqlString.escape', {
  'nested arrays are turned into grouped lists': function() {
    assert.equal(SqlString.escape([[1,2,3], [4,5,6], ['a', 'b', {nested: true}]]), "(1, 2, 3), (4, 5, 6), ('a', 'b', '[object Object]')");
  },
});
