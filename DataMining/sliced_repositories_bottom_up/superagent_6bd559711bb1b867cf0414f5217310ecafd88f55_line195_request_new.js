var request = require('../../');
describe('request', function() {
window.btoa = window.btoa || null;
it('basic auth', function(next){
  window.btoa = window.btoa || require('Base64').btoa;
});
it('auth type "basic"', function(next){
  window.btoa = window.btoa || require('Base64').btoa;
});
it('auth type "auto"', function(next){
  window.btoa = window.btoa || require('Base64').btoa;
});
it('Request#parse overrides body parser no matter Content-Type', function(done){
  function testParser(data){
  }
  var req = request
  .serialize(testParser)
});
});
