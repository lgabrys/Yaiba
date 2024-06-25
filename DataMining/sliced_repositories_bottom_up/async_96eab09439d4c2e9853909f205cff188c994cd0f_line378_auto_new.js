var async = require('../lib');
describe('auto', function () {
    it('should handle array tasks with just a function', function (done) {
        async.auto({
        }, done);
    });
});
