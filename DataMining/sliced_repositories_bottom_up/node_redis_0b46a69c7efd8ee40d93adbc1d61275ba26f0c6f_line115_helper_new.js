var path = require('path');

function startRedis (conf, done) {
}
if (!process.env.REDIS_TESTS_STARTED) {
  process.env.REDIS_TESTS_STARTED = true;
  before(function (done) {
  });
}
module.exports = {
    redisProcess: function () {
    },
    isNull: function (done) {
    },
    allTests: function (cb) {
        [undefined].forEach(function (options) { // add buffer option at some point
            describe(options && options.return_buffers ? "returning buffers" : "returning strings", function () {
                var protocols = ['IPv4'];
                if (process.platform !== 'win32') {
                    protocols.push('IPv6');
                }
            });
        });
    },
};
