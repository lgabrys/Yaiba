var redis = require("redis"),
    client = redis.createClient("/tmp/redis.sock"),
    profiler = require("v8-profiler");
setTimeout(function () {
    profiler.takeSnapshot();
}, 5000);
