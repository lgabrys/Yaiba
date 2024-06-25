var assert = require('assert');
var config = require('../lib/config');
var helper = require('../helper');
var redis = config.redis;
describe("The 'select' method", function () {
    helper.allTests(function (parser, ip, args) {
        describe('using ' + parser + ' and ' + ip, function () {
            describe('when not connected', function () {
                var client;
                beforeEach(function (done) {
                    client = redis.createClient.apply(null, args);
                });
                it('returns an error if redis is not connected', function (done) {
                    var buffering = client.select(1, function (err, res) {
                        assert(err.message.match(/The connection is already closed/));
                    });
                });
            });
        });
    });
});
