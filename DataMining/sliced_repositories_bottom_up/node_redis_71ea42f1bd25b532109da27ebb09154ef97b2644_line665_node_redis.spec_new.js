var config = require("./lib/config");
var helper = require('./helper');
var redis = config.redis;
describe("The node_redis client", function () {
    helper.allTests(function(parser, ip, args) {
        describe("using " + parser + " and " + ip, function () {
            describe('enable_offline_queue', function () {
                describe('true', function () {
                    it("does not throw an error and enqueues operation", function (done) {
                        var client = redis.createClient(9999, null, {
                        });
                        return setTimeout(function() {
                            client.set('foo', 'bar', function(err, result) {
                                if (err) return done(err);
                            });
                        }, 50);
                    });
                });
            });
        });
    });
});
