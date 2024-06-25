var redis = require("./index"),
    client = redis.createClient(),
    assert = require("assert"),
    sys = require('sys'),
    tests = {}, iterations = 10000;
redis.debug_mode = false;
function require_string(str, label) {
}
function next(name) {
}
tests.FLUSHDB = function () {
    var name = "FLUSHDB";
    client.mset("flush keys 1", "flush val 1", "flush keys 2", "flush val 2", require_string("OK", name));
    client.FLUSHDB(require_string("OK", name));
    client.dbsize(last(name, require_number(0, name)));
};
tests.PING_10K = function () {
    var name = "PING_10K", i = iterations;

    do {
        client.PING();
        i -= 1;
    } while (i > 1);
    client.PING([], function (err, res) {
        assert.strictEqual("PONG", res);
        reportRPS();
        next(name);
    });
};
tests.SET_10K = function () {
    var name = "SET_10K", i = iterations;

    do {
        client.SET("foo_rand000000000000", "xxx");
        i -= 1;
    } while (i > 1);
    client.SET("foo_rand000000000000", "xxx", function (err, res) {
        assert.strictEqual("OK", res);
        reportRPS();
        next(name);
    });
};
tests.GET_10K = function () {
    var name = "GET_10K", i = iterations;

    do {
        client.GET("foo_rand000000000000");
        i -= 1;
    } while (i > 1);
    client.GET("foo_rand000000000000", function (err, res) {
        assert.strictEqual("xxx", res.toString());
        reportRPS();
        next(name);
    });
};
tests.INCR_10K = function () {
    var name = "INCR_10K", i = iterations;

    do {
        client.INCR("counter_rand000000000000");
        i -= 1;
    } while (i > 1);
    client.INCR("counter_rand000000000000", function (err, res) {
        assert.strictEqual(iterations, res);
        reportRPS();
        next(name);
    });
};
tests.LPUSH_10K = function () {
    var name = "LPUSH_10K", i = iterations;

    do {
        client.LPUSH("mylist", "bar");
        i -= 1;
    } while (i > 1);
    client.LPUSH("mylist", "bar", function (err, res) {
        assert.strictEqual(iterations, res);
        reportRPS();
        next(name);
    });
};
tests.LRANGE_10K_100 = function () {
    var name = "LRANGE_10K_100", i = iterations;

    do {
        client.LRANGE("mylist", 0, 99);
        i -= 1;
    } while (i > 1);
    client.LRANGE("mylist", 0, 99, function (err, res) {
        assert.strictEqual("bar", res[0].toString());
        reportRPS();
        next(name);
    });
};
tests.LRANGE_10K_450 = function () {
    var name = "LRANGE_10K_450", i = iterations;

    do {
        client.LRANGE("mylist", 0, 449);
        i -= 1;
    } while (i > 1);
    client.LRANGE("mylist", 0, 449, function (err, res) {
        assert.strictEqual("bar", res[0].toString());
        reportRPS();
        next(name);
    });
};
tests.EXISTS = function () {
    var name = "EXISTS";
    client.del("foo", "foo2", require_number_any(name));
    client.set("foo", "bar", require_string("OK", name));
    client.EXISTS("foo", require_number(1, name));
    client.EXISTS("foo2", last(name, require_number(0, name)));
};
tests.DEL = function () {
    var name = "DEL";
    client.DEL("delkey", require_number_any(name));
    client.set("delkey", "delvalue", require_string("OK", name));
    client.DEL("delkey", require_number(1, name));
    client.exists("delkey", require_number(0, name));
    client.DEL("delkey", require_number(0, name));
    client.mset("delkey", "delvalue", "delkey2", "delvalue2", require_string("OK", name));
    client.DEL("delkey", "delkey2", last(name, require_number(2, name)));
};
tests.TYPE = function () {
    var name = "TYPE";
    client.set(["string key", "should be a string"], require_string("OK", name));
    client.rpush(["list key", "should be a list"], require_number_pos(name));
    client.sadd(["set key", "should be a set"], require_number_any(name));
    client.zadd(["zset key", "10.0", "should be a zset"], require_number_any(name));
    client.hset(["hash key", "hashtest", "should be a hash"], require_number_any(0, name));

    client.TYPE(["string key"], require_string("string", name));
    client.TYPE(["list key"], require_string("list", name));
    client.TYPE(["set key"], require_string("set", name));
    client.TYPE(["zset key"], require_string("zset", name));
    client.TYPE(["hash key"], last(name, require_string("hash", name)));
};
tests.KEYS = function () {
    var name = "KEYS";
    client.mset(["test keys 1", "test val 1", "test keys 2", "test val 2"], require_string("OK", name));
    client.KEYS(["test keys*"], function (err, results) {
        assert.strictEqual(null, err, "result sent back unexpected error");
        assert.strictEqual(2, results.length, name);
        assert.strictEqual("test keys 1", results[0].toString(), name);
        assert.strictEqual("test keys 2", results[1].toString(), name);
        next(name);
    });
};
tests.MULTIBULK_ZERO_LENGTH = function () {
    var name = "MULTIBULK_ZERO_LENGTH";
    client.KEYS(['users:*'], function(err, results){
        assert.strictEqual(null, err, 'error on empty multibulk reply');
        assert.strictEqual(null, results);
        next(name);
    });
};
