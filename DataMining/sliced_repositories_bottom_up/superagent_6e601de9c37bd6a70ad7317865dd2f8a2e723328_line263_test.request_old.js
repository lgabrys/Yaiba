request = superagent;
test('POST json array', function(next){
  request
  .end(function(res){
    assert('application/json' == res.header['content-type']);
  });
});
