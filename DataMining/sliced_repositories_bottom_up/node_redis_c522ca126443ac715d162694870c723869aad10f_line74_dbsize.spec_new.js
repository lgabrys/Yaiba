var config = require("../lib/config");
var helper = require('../helper');
var redis = config.redis;
describe("The 'dbsize' method", function () {
    helper.allTests(function(parser, ip, args) {
        describe("using " + parser + " and " + ip, function () {
            describe("when connected", function () {
                var client;
                beforeEach(function (done) {
                    client = redis.createClient.apply(redis.createClient, args);
                });
                describe("when more data is added to Redis", function () {
                    beforeEach(function (done) {
                        client.dbsize(function (err, res) {
                        });
                    });
                });
            });
        });
    });
});
