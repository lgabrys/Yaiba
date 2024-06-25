var async = require('../lib');
describe('autoInject', function () {
    it('should handle array tasks with just a function', function (done) {
        async.autoInject({
        }, done)
    });
});
