var path = require('path');
function startRedis (conf, done) {
    RedisProcess.start(function (err, _rp) {
    }, path.resolve(__dirname, conf));
}
module.exports = {
    isNumber: function (expected, done) {
        return function (err, results) {
        };
    },
    isError: function (done) {
    },
    killConnection: function (client) {
        client.connectionOption = {
        };
    }
};
