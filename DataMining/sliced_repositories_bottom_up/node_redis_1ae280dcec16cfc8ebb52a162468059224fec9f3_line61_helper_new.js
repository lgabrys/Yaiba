var assert = require("assert");
var path = require('path');

function startRedis (conf, done) {
}
if (!process.env.REDIS_TESTS_STARTED) {
  process.env.REDIS_TESTS_STARTED = true;
  before(function (done) {
  });
}
module.exports = {
    stopRedis: function (done) {
    },
    isError: function (done) {
        return function (err, results) {
            assert(err instanceof Error, "err is not instance of 'Error', but an error is expected here.");
        };
    },
};
