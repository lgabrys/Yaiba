var config = require("./lib/config");
var helper = require('./helper');
var redis = config.redis;
describe("detect_buffers", function () {
    helper.allTests(function(parser, ip, args) {
        describe("using " + parser + " and " + ip, function () {
            var client;
            var args = config.configureClient(parser, ip, {
                detect_buffers: true
            });
            beforeEach(function (done) {
                client = redis.createClient.apply(redis.createClient, args);
            });
        });
    });
});
