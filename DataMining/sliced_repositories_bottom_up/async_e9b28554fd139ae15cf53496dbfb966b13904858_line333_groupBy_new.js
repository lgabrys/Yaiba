var async = require('../lib');
describe('groupBy', function() {
    context('groupBySeries', function() {
        it('handles empty object', function(done) {
            async.groupBySeries({}, function(val, next) {
            });
        });
    });
});
