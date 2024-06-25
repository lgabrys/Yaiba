var config = require("./lib/config");
var helper = require('./helper');
var redis = config.redis;
describe("rename commands", function () {
    helper.allTests(function(parser, ip, args) {
        describe("using " + parser + " and " + ip, function () {
            var client = null;
            beforeEach(function(done)  {
                client = redis.createClient({
                });
                client.on('ready', function () {
                    client.flushdb(done);
                });
            });
        });
    });
});
