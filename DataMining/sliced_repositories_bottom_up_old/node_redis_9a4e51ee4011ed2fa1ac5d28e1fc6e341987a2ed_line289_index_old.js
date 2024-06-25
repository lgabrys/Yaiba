function RedisClient(stream, options) {
}
RedisClient.prototype.do_auth = function () {
};
RedisClient.prototype.on_connect = function () {
};
RedisClient.prototype.ready_check = function () {
};
RedisClient.prototype.send_offline_queue = function () {
    var command_obj, buffered_writes = 0;
    while (this.offline_queue.length > 0) {
        command_obj = this.offline_queue.shift();
        buffered_writes += !this.send_command(command_obj.command, command_obj.args, command_obj.callback);
    }
    if (buffered_writes === 0) {
    }
};
