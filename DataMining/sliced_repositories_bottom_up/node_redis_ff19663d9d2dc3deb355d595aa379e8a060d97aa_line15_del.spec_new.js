var config = require("../lib/config");
var helper = require("../helper");
var redis = config.redis;
describe("The 'del' method", function () {
    helper.allTests(function(parser, ip, args) {
        describe("using " + parser + " and " + ip, function () {
            var client;
            beforeEach(function (done) {
                client = redis.createClient.apply(null, args);
            });
        });
    });
});
