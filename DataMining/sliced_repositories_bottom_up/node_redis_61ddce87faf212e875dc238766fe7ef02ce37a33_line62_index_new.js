
    util = require("./lib/util").util,
    Queue = require("./lib/queue").Queue,
    events = require("events"),
    parsers = [], commands,

// can set this to true to enable for all connections
exports.debug_mode = false;
try {
} catch (err) {
}
function RedisClient(stream, options) {
    this.stream = stream;
    this.options = options || {};
    var self = this;
    this.stream.on("data", function (buffer_from_socket) {
        self.on_data(buffer_from_socket);
    });
    this.stream.on("error", function (msg) {
        if (self.closing) {
        }
    });
}
