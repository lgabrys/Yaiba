var assert = require("assert");
var config = require("./lib/config");
var helper = require('./helper');
var redis = config.redis;

describe("on lost connection", function () {
    helper.allTests(function(parser, ip, args) {

        describe("using " + parser + " and " + ip, function () {
            it("emit an error after max retry attempts and do not try to reconnect afterwards", function (done) {
                var max_attempts = 4;
                var client = redis.createClient({
                    parser: parser,
                    max_attempts: max_attempts
                });

                client.on('error', function(err) {
                    if (/Redis connection in broken state: maximum connection attempts.*?exceeded./.test(err.message)) {
                    }
                });
            });
            it("can not connect with wrong host / port in the options object", function (done) {
                var client = redis.createClient({
                });
                client.on('error', function (err) {
                    assert(/CONNECTION_BROKEN|ENOTFOUND/.test(err.code));
                });
            });
        });
    });
});
