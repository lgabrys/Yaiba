var redis = require("./index"),
    client = redis.createClient(),
    client2 = redis.createClient(),
    client3 = redis.createClient(),
    assert = require("assert"),
    util = require("./lib/util").util,
    test_db_num = 15, // this DB will be flushed and used for testing
    tests = {},
    connected = false,
    ended = false,
    server_info;
function is_empty_array(obj) {
    return Array.isArray(obj) && obj.length === 0;
}
function last(name, fn) {
    return function (err, results) {
    };
}
function next(name) {
}
tests.FLUSHDB = function () {
    var name = "FLUSHDB";
    client.select(test_db_num, require_string("OK", name));
    client2.select(test_db_num, require_string("OK", name));
    client3.select(test_db_num, require_string("OK", name));
    client.mset("flush keys 1", "flush val 1", "flush keys 2", "flush val 2", require_string("OK", name));
    client.FLUSHDB(require_string("OK", name));
    client.dbsize(last(name, require_number(0, name)));
};
tests.MULTI_1 = function () {
    var name = "MULTI_1", multi1, multi2;

    // Provoke an error at queue time
    multi1 = client.multi();
    multi1.mset("multifoo", "10", "multibar", "20", require_string("OK", name));
    multi1.set("foo2", require_error(name));
    multi1.incr("multifoo", require_number(11, name));
    multi1.incr("multibar", require_number(21, name));
    multi1.exec();

    // Confirm that the previous command, while containing an error, still worked.
    multi2 = client.multi();
    multi2.incr("multibar", require_number(22, name));
    multi2.incr("multifoo", require_number(12, name));
    multi2.exec(function (err, replies) {
        assert.strictEqual(22, replies[0]);
        assert.strictEqual(12, replies[1]);
        next(name);
    });
};
tests.MULTI_2 = function () {
    var name = "MULTI_2";

    // test nested multi-bulk replies
    client.multi([
        ["mget", "multifoo", "multibar", function (err, res) {
            assert.strictEqual(2, res.length, name);
            assert.strictEqual("12", res[0].toString(), name);
            assert.strictEqual("22", res[1].toString(), name);
        }],
        ["set", "foo2", require_error(name)],
        ["incr", "multifoo", require_number(13, name)],
        ["incr", "multibar", require_number(23, name)]
    ]).exec(function (err, replies) {
        assert.strictEqual(2, replies[0].length, name);
        assert.strictEqual("12", replies[0][0].toString(), name);
        assert.strictEqual("22", replies[0][1].toString(), name);

        assert.strictEqual("13", replies[1].toString());
        assert.strictEqual("23", replies[2].toString());
        next(name);
    });
};
tests.MULTI_3 = function () {
    var name = "MULTI_3";

    client.sadd("some set", "mem 1");
    client.sadd("some set", "mem 2");
    client.sadd("some set", "mem 3");
    client.sadd("some set", "mem 4");

    // test nested multi-bulk replies with nulls.
    client.multi([
        ["smembers", "some set"],
        ["del", "some set"],
        ["smembers", "some set"]
    ])
    .scard("some set")
    .exec(function (err, replies) {
        assert.strictEqual(true, is_empty_array(replies[2][0]), name);
        next(name);
    });
};
