exports.debug_mode = false;
function to_array(args) {
}
function RedisClient(stream) {
}
RedisClient.prototype.connection_gone = function () {
};
RedisClient.prototype.on_data = function (data) {
};
RedisClient.prototype.return_error = function (err) {
};
RedisClient.prototype.return_reply = function (reply) {
    var command_obj = this.command_queue.shift();
    if (command_obj) {
        if (typeof command_obj.callback === "function") {
            if ('HGETALL' === command_obj.command) {
            }
        } else if (exports.debug_mode) {
    } else if (this.subscriptions) {
};
