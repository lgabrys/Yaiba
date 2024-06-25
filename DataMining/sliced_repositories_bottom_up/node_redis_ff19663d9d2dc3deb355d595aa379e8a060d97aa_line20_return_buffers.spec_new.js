var config = require("./lib/config");
var helper = require('./helper');
var redis = config.redis;
describe("return_buffers", function () {

    helper.allTests(function(parser, ip, basicArgs) {

        describe("using " + parser + " and " + ip, function () {
            var client;
            var args = config.configureClient(parser, ip, {
                return_buffers: true,
                detect_buffers: true
            });
            beforeEach(function (done) {
                client = redis.createClient.apply(null, args);
            });
        });
    });
});
