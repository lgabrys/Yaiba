  , fs = require('fs')
  , request = require('../../')
describe('res.body', function(){
  var img = fs.readFileSync(__dirname + '/fixtures/test.png');
  describe('image/png', function(){
    it('should parse the body', function(done){
      request
      .end(function(res){
        res.body.should.eql(img.toString('utf8'));
      });
    });
  });
});
