var helper = require('./helper');
describe('The node_redis client', function () {
    helper.allTests(function (parser, ip, args) {
        describe('using ' + parser + ' and ' + ip, function () {
            describe('unref', function () {
                it('exits subprocess as soon as final command is processed', function (done) {
                    var id = setTimeout(function () {
                        done(Error('unref subprocess timed out'));
                    }, 8000);
                });
            });
        });
    });
});
