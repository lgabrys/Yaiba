var equal = require('assert').equal;
var unquote = require('../unquote');
test('#unquote', function(){
  equal(unquote('\'foo\'', '\''), 'foo');
});
