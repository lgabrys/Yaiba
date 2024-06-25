var setup = require('./support/setup');
var NODE = setup.NODE;
var request = require('../');
describe('request', function(){
  describe('req.send(Object)', function(){
    describe('when called several times', function(){
      it('should merge the objects', function(done){
        request
        .end(function(err, res){
            try {
          if (NODE) {
            res.buffered.should.be.true();
          }
          } catch(e) { done(e); }
      });
      })
    })
  })
})
