request = superagent;
test('Request inheritance', function(){
  assert(request.get('/') instanceof request.Request);
});
test('POST multiple .send() strings', function(next){
  request
  .end(function(res){
    next();
  })
});
