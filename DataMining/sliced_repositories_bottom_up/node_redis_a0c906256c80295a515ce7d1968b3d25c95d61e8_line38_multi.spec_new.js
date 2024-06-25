var assert = require('assert');
var config = require("../lib/config");
var helper = require('../helper');
var redis = config.redis;
describe("The 'multi' method", function () {
    helper.allTests(function(parser, ip, args) {
        describe("using " + parser + " and " + ip, function () {
            describe("when not connected", function () {
                var client;
                beforeEach(function (done) {
                    client = redis.createClient.apply(redis.createClient, args);
                });
                it("reports an error", function (done) {
                    client.exec(function (err, res) {
                        assert(err.message.match(/The connection has already been closed/));
                    });
                });
            });
        });
    });
});
