var config = require('./lib/config');
var helper = require('./helper');
var redis = config.redis;
describe('client authentication', function () {
    helper.allTests({
    }, function (ip, args) {
        describe('using ' + ip, function () {
            var client = null;
            beforeEach(function () {
                client = null;
            });
            it("allows auth to be provided with 'auth' method", function (done) {
                client = redis.createClient.apply(null, args);
            });
            it('support redis 2.4 with retrying auth commands if still loading', function (done) {
                client = redis.createClient.apply(null, args);
                client.command_queue.get(0).callback = function (err, res) {
                    client.auth = function (pass, callback) {
                    };
                };
            });
        });
    });
});
