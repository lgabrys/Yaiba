'use strict';

var assert = require("assert");
var config = require("../lib/config");
var crypto = require("crypto");
var helper = require("../helper");
var redis = config.redis;

describe("The 'eval' method", function () {

    helper.allTests(function(parser, ip, args) {

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

            it('converts a float to an integer when evaluated', function (done) {
                helper.serverVersionAtLeast.bind(this)(client, [2, 5, 0]);
                client.eval("return 100.5", 0, helper.isNumber(100, done));
            });

            it('returns a string', function (done) {
                helper.serverVersionAtLeast.bind(this)(client, [2, 5, 0]);
                client.eval("return 'hello world'", 0, helper.isString('hello world', done));
            });

            it('converts boolean true to integer 1', function (done) {
                helper.serverVersionAtLeast.bind(this)(client, [2, 5, 0]);
                client.eval("return true", 0, helper.isNumber(1, done));
            });

            it('converts boolean false to null', function (done) {
                helper.serverVersionAtLeast.bind(this)(client, [2, 5, 0]);
                client.eval("return false", 0, helper.isNull(done));
            });

            it('converts lua status code to string representation', function (done) {
                helper.serverVersionAtLeast.bind(this)(client, [2, 5, 0]);
                client.eval("return {ok='fine'}", 0, helper.isString('fine', done));
            });

            it('converts lua error to an error response', function (done) {
                helper.serverVersionAtLeast.bind(this)(client, [2, 5, 0]);
                client.eval("return {err='this is an error'}", 0, helper.isError(done));
            });

            it('represents a lua table appropritely', function (done) {
                helper.serverVersionAtLeast.bind(this)(client, [2, 5, 0]);
                client.eval("return {1,2,3,'ciao',{1,2}}", 0, function (err, res) {
                    assert.strictEqual(5, res.length);
                    assert.strictEqual(1, res[0]);
                    assert.strictEqual(2, res[1]);
                    assert.strictEqual(3, res[2]);
                    assert.strictEqual("ciao", res[3]);
                    assert.strictEqual(2, res[4].length);
                    assert.strictEqual(1, res[4][0]);
                    assert.strictEqual(2, res[4][1]);
                    return done();
                });
            });

            it('populates keys and argv correctly', function (done) {
                helper.serverVersionAtLeast.bind(this)(client, [2, 5, 0]);
                client.eval("return {KEYS[1],KEYS[2],ARGV[1],ARGV[2]}", 2, "a", "b", "c", "d", function (err, res) {
                    assert.strictEqual(4, res.length);
                    assert.strictEqual("a", res[0]);
                    assert.strictEqual("b", res[1]);
                    assert.strictEqual("c", res[2]);
                    assert.strictEqual("d", res[3]);
                    return done();
                });
            });

            it('allows arguments to be provided in array rather than as multiple parameters', function (done) {
                helper.serverVersionAtLeast.bind(this)(client, [2, 5, 0]);
                client.eval(["return {KEYS[1],KEYS[2],ARGV[1],ARGV[2]}", 2, "a", "b", "c", "d"], function (err, res) {
                    assert.strictEqual(4, res.length);
                    assert.strictEqual("a", res[0]);
                    assert.strictEqual("b", res[1]);
                    assert.strictEqual("c", res[2]);
                    assert.strictEqual("d", res[3]);
                    return done();
                });
            });

            describe('evalsha', function () {
                var source = "return redis.call('get', 'sha test')";
                var sha = crypto.createHash('sha1').update(source).digest('hex');

                beforeEach(function (done) {
                    client.set("sha test", "eval get sha test", function (err, res) {
                        return done(err);
                    });
                });

                it('allows a script to be executed that accesses the redis API', function (done) {
                    helper.serverVersionAtLeast.bind(this)(client, [2, 5, 0]);
                    client.eval(source, 0, helper.isString('eval get sha test', done));
                });

                it('can execute a script if the SHA exists', function (done) {
                    helper.serverVersionAtLeast.bind(this)(client, [2, 5, 0]);
                    client.evalsha(sha, 0, helper.isString('eval get sha test', done));
                });

                it('throws an error if SHA does not exist', function (done) {
                    helper.serverVersionAtLeast.bind(this)(client, [2, 5, 0]);
                    client.evalsha('ffffffffffffffffffffffffffffffffffffffff', 0, helper.isError(done));
                });
            });

            it('allows a key to be incremented, and performs appropriate conversion from LUA type', function (done) {
                helper.serverVersionAtLeast.bind(this)(client, [2, 5, 0]);
                client.set("incr key", 0, function (err, reply) {
                    if (err) return done(err);
                    client.eval("local foo = redis.call('incr','incr key')\n" + "return {type(foo),foo}", 0, function (err, res) {
                        assert.strictEqual(2, res.length);
                        assert.strictEqual("number", res[0]);
                        assert.strictEqual(1, res[1]);
                        return done(err);
                    });
                });
            });

            it('allows a bulk operation to be performed, and performs appropriate conversion from LUA type', function (done) {
                helper.serverVersionAtLeast.bind(this)(client, [2, 5, 0]);
                client.set("bulk reply key", "bulk reply value", function (err, res) {
                    client.eval("local foo = redis.call('get','bulk reply key'); return {type(foo),foo}", 0, function (err, res) {
                        assert.strictEqual(2, res.length);
                        assert.strictEqual("string", res[0]);
                        assert.strictEqual("bulk reply value", res[1]);
                        return done(err);
                    });
                });
            });

            it('allows a multi mulk operation to be performed, with the appropriate type conversion', function (done) {
                helper.serverVersionAtLeast.bind(this)(client, [2, 5, 0]);
                client.multi()
                    .del("mylist")
                    .rpush("mylist", "a")
                    .rpush("mylist", "b")
                    .rpush("mylist", "c")
                    .exec(function (err, replies) {
                        if (err) return done(err);
                        client.eval("local foo = redis.call('lrange','mylist',0,-1); return {type(foo),foo[1],foo[2],foo[3],# foo}", 0, function (err, res) {
                            assert.strictEqual(5, res.length);
                            assert.strictEqual("table", res[0]);
                            assert.strictEqual("a", res[1]);
                            assert.strictEqual("b", res[2]);
                            assert.strictEqual("c", res[3]);
                            assert.strictEqual(3, res[4]);
                            return done(err);
                        });
                    });
            });

            it('returns an appropriate representation of Lua status reply', function (done) {
                helper.serverVersionAtLeast.bind(this)(client, [2, 5, 0]);
                client.eval("local foo = redis.call('set','mykey','myval'); return {type(foo),foo['ok']}", 0, function (err, res) {
                    assert.strictEqual(2, res.length);
                    assert.strictEqual("table", res[0]);
                    assert.strictEqual("OK", res[1]);
                    return done(err);
                });
            });

            it('returns an appropriate representation of a Lua error reply', function (done) {
                helper.serverVersionAtLeast.bind(this)(client, [2, 5, 0]);
                client.set("error reply key", "error reply value", function (err, res) {
                    if (err) return done(err);
                    client.eval("local foo = redis.pcall('incr','error reply key'); return {type(foo),foo['err']}", 0, function (err, res) {
                        assert.strictEqual(2, res.length);
                        assert.strictEqual("table", res[0]);
                        assert.strictEqual("ERR value is not an integer or out of range", res[1]);
                        return done(err);
                    });
                });
            });

            it('returns an appropriate representation of a Lua nil reply', function (done) {
                helper.serverVersionAtLeast.bind(this)(client, [2, 5, 0]);
                client.del("nil reply key", function (err, res) {
                    if (err) return done(err);
                    client.eval("local foo = redis.call('get','nil reply key'); return {type(foo),foo == false}", 0, function (err, res) {
                        if (err) throw err;
                        assert.strictEqual(2, res.length);
                        assert.strictEqual("boolean", res[0]);
                        assert.strictEqual(1, res[1]);
                        return done(err);
                    });
                });
            });
        });
    });
});
