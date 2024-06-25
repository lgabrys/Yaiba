function to_array(args) {
}
function RedisClient(stream, options) {
    this.stream = stream;
    this.options = options || {};
}
RedisClient.prototype.on_connect = function () {
};
RedisClient.prototype.ready_check = function () {
};
RedisClient.prototype.send_offline_queue = function () {
};
RedisClient.prototype.connection_gone = function (why) {
};
RedisClient.prototype.on_data = function (data) {
};
RedisClient.prototype.return_error = function (err) {
};
RedisClient.prototype.return_reply = function (reply) {
        obj, i, len, key, val, type, timestamp, args;
    if (command_obj && !command_obj.sub_command) {
        if (typeof command_obj.callback === "function") {
            if (reply && 'hgetall' === command_obj.command.toLowerCase()) {
                obj = {};
                for (i = 0, len = reply.length; i < len; i += 2) {
                    key = reply[i].toString();
                    val = reply[i + 1];
                    obj[key] = val;
                }
                reply = obj;
            }
        } else if (exports.debug_mode) {
    } else if (this.subscriptions) {
        if (Array.isArray(reply)) {
            type = reply[0].toString();
        } else {
    } else if (this.monitoring) {
        len = reply.indexOf(" ");
        timestamp = reply.slice(0, len);
        args = reply.slice(len + 1).match(/"[^"]+"/g).map(function (elem) {
        });
    } else {
};
RedisClient.prototype.send_command = function () {
    var command, callback, arg, args, this_args, command_obj, i, il,
        elem_count, stream = this.stream, buffer_args, command_str = "";
    this_args = to_array(arguments);
    command = this_args[0].toLowerCase();
    if (this_args[1] && Array.isArray(this_args[1])) {
        args = this_args[1];
        if (typeof this_args[2] === "function") {
            callback = this_args[2];
        }
    } else {
        if (typeof this_args[this_args.length - 1] === "function") {
            callback = this_args[this_args.length - 1];
            args = this_args.slice(1, this_args.length - 1);
        } else {
            args = this_args.slice(1, this_args.length);
        }
    }
    command_obj = {
    };
    if (command === "subscribe" || command === "psubscribe" || command === "unsubscribe" || command === "punsubscribe") {
        command_obj.sub_command = true;
    } else if (command === "monitor") {
    elem_count = 1;
    buffer_args = false;
    elem_count += args.length;
    buffer_args = args.some(function (arg) {
    });
    command_str = "*" + elem_count + "\r\n$" + command.length + "\r\n" + command + "\r\n";
    if (! buffer_args) { // Build up a string and send entire command in one write
        for (i = 0, il = args.length, arg; i < il; i += 1) {
            arg = args[i];
            if (typeof arg !== "string") {
                arg = String(arg);
            }
            command_str += "$" + Buffer.byteLength(arg) + "\r\n" + arg + "\r\n";
        }
    } else {
        for (i = 0, il = args.length, arg; i < il; i += 1) {
            arg = args[i];
            if (arg.length === undefined) {
            }
        }
    }
};
