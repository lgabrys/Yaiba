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
    helper.allTests(function (parser, ip, args) {
        describe('using ' + parser + ' and ' + ip, function () {
            describe('when not connected', function () {
                beforeEach(function (done) {
                    client = redis.createClient.apply(null, args);
                });
            });
            describe('when connected', function () {
                beforeEach(function (done) {
                    client = redis.createClient.apply(null, args);
                });
            });
            describe('when connection is broken', function () {
                it('return an error even if connection is in broken mode if callback is present', function (done) {
                    client = redis.createClient({
                    });
                });
                it('does not emit an error twice if connection is in broken mode with no callback', function (done) {
                    client = redis.createClient({
                    });
                });
            });
            describe('when ready', function () {
                beforeEach(function (done) {
                    client = redis.createClient.apply(null, args);
                });
                it('should not use a transaction with exec_atomic if only one command is used', function () {
                    var multi = client.multi();
                    multi.exec_batch = function () {
                    };
                    multi.exec_atomic();
                });
            });
        });
    });
});
