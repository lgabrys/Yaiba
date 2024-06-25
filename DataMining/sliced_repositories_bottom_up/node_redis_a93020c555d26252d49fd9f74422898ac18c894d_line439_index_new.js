    sys = require("sys"),
    events = require("events"),
exports.debug_mode = false;
function to_array(args) {
}
function RedisClient(stream) {
}
RedisClient.prototype.connection_gone = function () {
    var self = this;
    self.connected = false;
    self.attempts += 1;
    self.retry_timer = setTimeout(function () {
        self.retry_delay = self.retry_delay * self.retry_backoff;
    }, self.retry_delay);
};
RedisClient.prototype.on_data = function (data) {
};
RedisClient.prototype.return_error = function (err) {
    var command_obj = this.command_queue.shift();
};
RedisClient.prototype.return_reply = function (reply) {
    var command_obj = this.command_queue.shift();
    if (command_obj) {
        if (typeof command_obj.callback === "function") {
            if (reply && 'HGETALL' === command_obj.command) {
            }
        } else if (exports.debug_mode) {
    } else if (this.subscriptions) {
};
