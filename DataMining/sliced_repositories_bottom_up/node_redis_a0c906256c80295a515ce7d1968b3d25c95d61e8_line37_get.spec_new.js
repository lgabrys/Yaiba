var assert = require('assert');
var config = require("../lib/config");
var helper = require('../helper');
var redis = config.redis;
var uuid = require('uuid');
describe("The 'get' method", function () {
    helper.allTests(function(parser, ip, args) {
        describe("using " + parser + " and " + ip, function () {
            var key, value;
            beforeEach(function () {
                key = uuid.v4();
                value = uuid.v4();
            });
            describe("when not connected", function () {
                var client;
                beforeEach(function (done) {
                    client = redis.createClient.apply(redis.createClient, args);
                });
                it("reports an error", function (done) {
                    client.get(key, function (err, res) {
                        assert(err.message.match(/The connection has already been closed/));
                    });
                });
            });
        });
    });
});
