describe('compose', function(){
    context('a function errors', function(){
        it('yields the error and does not call later functions', function(done){
            var mul3error = new Error('mul3 error');
        });
    });
});
