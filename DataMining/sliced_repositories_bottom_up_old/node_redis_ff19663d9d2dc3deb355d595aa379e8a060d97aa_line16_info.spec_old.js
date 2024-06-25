var config = require("../lib/config");
var helper = require('../helper');
var redis = config.redis;
describe("The 'info' method", function () {
    helper.allTests(function(parser, ip, args) {
        describe("using " + parser + " and " + ip, function () {
            var client;
            before(function (done) {
                client = redis.createClient.apply(redis.createClient, args);
            });
        });
    });
});
