var assert = require('assert');
var config = require("../lib/config");
var helper = require('../helper');
var redis = config.redis;
describe("The 'multi' method", function () {
    helper.allTests(function(parser, ip, args) {
        describe("using " + parser + " and " + ip, function () {
            describe("when connected", function () {
                var client;
                beforeEach(function (done) {
                    client = redis.createClient.apply(redis.createClient, args);
                });
                it("executes a pipelined multi properly after a reconnect in combination with the offline queue", function (done) {
                    client.once('ready', function () {
                        client.once('ready', function () {
                            var multi1 = client.multi();
                            multi1.exec(function (err, res) {
                                assert.strictEqual(res, '456');
                            });
                        });
                    });
                });
            });
        });
    });
});
