var assert = require("assert");
var config = require("./lib/config");
var helper = require('./helper');
var redis = config.redis;
// If this is merged, remove the travis env checks
describe("TLS connection tests", function () {
    var client;
    describe("on lost connection", function () {
        it("emit an error after max retry timeout and do not try to reconnect afterwards", function (done) {
            client = redis.createClient({
            });
            client.on('error', function(err) {
                if (/Redis connection in broken state: connection timeout.*?exceeded./.test(err.message)) {
                }
            });
        });
    });
    describe("when not connected", function () {
        it("connect with host and port provided in the options object", function (done) {
            client = redis.createClient({
            });
        });
        it('fails to connect because the cert is not correct', function (done) {
            client = redis.createClient({
            });
            client.on('error', function (err) {
                assert(/DEPTH_ZERO_SELF_SIGNED_CERT/.test(err.code || err.message), err);
            });
        });
    });
});
