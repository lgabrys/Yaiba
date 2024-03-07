'use strict';

var assert = require("assert");
var config = require("../lib/config");
var helper = require("../helper");
var redis = config.redis;

describe("The 'client' method", function () {

    helper.allTests(function(parser, ip, args) {
        var pattern = /addr=/;

        describe("using " + parser + " and " + ip, function () {
            var client;

            beforeEach(function (done) {
                client = redis.createClient.apply(redis.createClient, args);
                client.once("error", done);
                client.once("connect", function () {
                    client.flushdb(done);
                });
            });

            afterEach(function () {
                client.end();
            });

            describe('list', function () {
                it('lists connected clients', function (done) {
                    client.client("LIST", helper.match(pattern, done));
                });

                it("lists connected clients when invoked with multi's chaining syntax", function (done) {
                    client.multi().client("list").exec(function(err, results) {
                        assert(pattern.test(results[0]), "expected string '" + results + "' to match " + pattern.toString());
                        return done();
                    });
                });

                it("lists connected clients when invoked with multi's array syntax", function (done) {
                    client.multi().client("list").exec(function(err, results) {
                        assert(pattern.test(results[0]), "expected string '" + results + "' to match " + pattern.toString());
                        return done();
                    });
                });
            });
        });
    });
});
