request = superagent;
test('Request inheritance', function(){
  assert(request.get('/') instanceof request.Request);
});
test('GET querystring object .get(uri, obj)', function(next){
  request
  .query('/querystring', { search: 'Manny' })
});
