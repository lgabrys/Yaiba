var assert = require('assert');
var config = require('./lib/config');
var helper = require('./helper');
var redis = config.redis;
var client;
describe("The 'multi' method", function () {
    describe('regression test', function () {
        it('saved buffers with charsets different than utf-8 (issue #913)', function (done) {
            client = redis.createClient();
        });
    });
    describe('pipeline limit', function () {
        it('do not exceed maximum string size', function (done) {
            client = redis.createClient();
        });
    });
    helper.allTests(function (ip, args) {
        describe('using ' + ip, function () {
            describe('when not connected', function () {
                beforeEach(function (done) {
                    client = redis.createClient.apply(null, args);
                });
            });
            describe('when connected', function () {
                beforeEach(function () {
                    client = redis.createClient.apply(null, args);
                });
                describe('monitor and transactions do not work together', function () {
                    it('results in a execabort', function (done) {
                        client.monitor(function (e) {
                        });
                    });
                });
            });
            describe('when connection is broken', function () {
                it('return an error even if connection is in broken mode if callback is present', function (done) {
                    client = redis.createClient({
                    });
                    client.multi([['set', 'foo', 'bar'], ['get', 'foo']]).exec(function (err, res) {
                        assert(/Redis connection in broken state: maximum connection attempts exceeded/.test(err.message));
                    });
                });
            });
        });
    });
});
