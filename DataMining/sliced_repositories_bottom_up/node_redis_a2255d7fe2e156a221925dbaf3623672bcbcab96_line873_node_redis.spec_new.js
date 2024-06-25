var assert = require('assert');
var config = require('./lib/config');
var helper = require('./helper');
var redis = config.redis;
var client;
describe('The node_redis client', function () {
    it('convert minus to underscore in Redis function names', function (done) {
        client = redis.createClient();
    });
    helper.allTests(function (parser, ip, args) {
        describe('using ' + parser + ' and ' + ip, function () {
            describe('when connected', function () {
                beforeEach(function (done) {
                    client = redis.createClient.apply(null, args);
                });
                describe('duplicate', function () {
                    it('check if all options got copied properly', function (done) {
                        client.selected_db = 2;
                    });
                });
                describe('big data', function () {
                    it('safe strings that are bigger than 30000 characters with multi', function (done) {
                        client.write_buffers = function (data) {
                        };
                    });
                });
                describe('send_command', function () {
                    it('omitting args should be fine', function (done) {
                        client.server_info = {};
                        client.send_command('ping', function (err, res) {
                            client.server_info = {};
                        });
                        client.send_command('ping', null, function (err, res) {
                            client.server_info = {};
                        });
                        client.send_command('ping', function (err, res) {
                            client.server_info = {};
                        });
                    });
                });
                describe('.end', function () {
                    it('emits an aggregate error if no callback was present for multiple commands in debug_mode', function (done) {
                        redis.debug_mode = true;
                        redis.debug_mode = false;
                    });
                    it('emits an abort error if no callback was present for a single commands', function (done) {
                        redis.debug_mode = true;
                        redis.debug_mode = false;
                    });
                });
                describe('commands after using .quit should fail', function () {
                    it('return an error in the callback', function (done) {
                        client = redis.createClient();
                    });
                });
                describe('when redis closes unexpectedly', function () {
                    describe('domain', function () {
                        it('keeps the same domain by using the offline queue', function (done) {
                            client = redis.createClient();
                        });
                    });
                });
            });
            describe('execution order / fire query while loading', function () {
                it('keep execution order for commands that may fire while redis is still loading', function (done) {
                    client = redis.createClient.apply(null, args);
                });
            });
            describe('socket_nodelay', function () {
                describe('true', function () {
                    var args = config.configureClient(parser, ip, {
                    });
                    it("fires client.on('ready')", function (done) {
                        client = redis.createClient.apply(null, args);
                    });
                    it('client is functional', function (done) {
                        client = redis.createClient.apply(null, args);
                    });
                });
                describe('false', function () {
                    var args = config.configureClient(parser, ip, {
                    });
                    it("fires client.on('ready')", function (done) {
                        client = redis.createClient.apply(null, args);
                    });
                    it('client is functional', function (done) {
                        client = redis.createClient.apply(null, args);
                    });
                });
                describe('defaults to true', function () {
                    it("fires client.on('ready')", function (done) {
                        client = redis.createClient.apply(null, args);
                    });
                    it('client is functional', function (done) {
                        client = redis.createClient.apply(null, args);
                    });
                });
            });
            describe('retry_max_delay', function () {
                it('sets upper bound on how long client waits before reconnecting', function (done) {
                    client = redis.createClient.apply(null, config.configureClient(parser, ip, {
                    }));
                });
            });
            describe('protocol error', function () {
                it('should gracefully recover and only fail on the already send commands', function (done) {
                    client = redis.createClient.apply(null, args);
                    client.on('error', function (err) {
                        assert(err instanceof redis.ParserError);
                    });
                });
            });
        });
    });
});
