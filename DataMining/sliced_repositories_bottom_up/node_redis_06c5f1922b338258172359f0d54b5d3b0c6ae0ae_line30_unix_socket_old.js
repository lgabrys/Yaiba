var redis = require("redis"),
    client = redis.createClient("/tmp/redis.sock"),
    profiler = require("v8-profiler");
setTimeout(function () {
    var snap = profiler.takeSnapshot();
}, 5000);
