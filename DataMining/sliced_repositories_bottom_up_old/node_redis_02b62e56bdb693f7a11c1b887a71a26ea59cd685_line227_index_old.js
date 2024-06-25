    events = require("events"),
    parsers = [], commands,
    default_host = "127.0.0.1";

exports.debug_mode = false;
try {
    parsers.push(require("./lib/parser/hiredis"));
} catch (err) {
    if (exports.debug_mode) {
    }
}
function RedisClient(stream, options) {
    this.options = options = options || {};
}
exports.RedisClient = RedisClient;
RedisClient.prototype.initialize_retry_vars = function () {
};
RedisClient.prototype.flush_and_error = function (message) {
};
RedisClient.prototype.on_error = function (msg) {
};
RedisClient.prototype.do_auth = function () {
};
RedisClient.prototype.on_connect = function () {
};
RedisClient.prototype.init_parser = function () {
    var self = this;
    if (this.options.parser) {
        if (! parsers.some(function (parser) {
            if (parser.name === self.options.parser) {
                this.parser_module = parser;
                if (exports.debug_mode) {
                    console.log("Using parser module: " + self.parser_module.name);
                }
                return true;
            }
        })) {
    } else {
};
