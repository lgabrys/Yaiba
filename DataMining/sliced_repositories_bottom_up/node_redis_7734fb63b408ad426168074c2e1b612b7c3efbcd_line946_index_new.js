var net = require("net"),
    to_array = require("./lib/to_array"),
    events = require("events"),
    parsers = [], commands,
    default_port = 6379,
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
};
RedisClient.prototype.on_ready = function () {
};
RedisClient.prototype.on_info_cmd = function (err, res) {
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
function reply_to_object(reply) {
}
function reply_to_strings(reply) {
    var i;
    if (Array.isArray(reply)) {
        for (i = 0; i < reply.length; i++) {
            reply[i] = reply[i].toString();
        }
    }
}
RedisClient.prototype.return_reply = function (reply) {
    if (command_obj && !command_obj.sub_command) {
        if (typeof command_obj.callback === "function") {
            if (this.options.detect_buffers && command_obj.buffer_args === false) {
                reply = reply_to_strings(reply);
            }
            if (reply && 'hgetall' === command_obj.command.toLowerCase()) {
                reply = reply_to_object(reply);
            }
        } else if (exports.debug_mode) {
    } else if (this.pub_sub_mode || (command_obj && command_obj.sub_command)) {
};
RedisClient.prototype.send_command = function (command, args, callback) {
    if (Array.isArray(args)) {
        } else if (! callback) {
            if (last_arg_type === "function" || last_arg_type === "undefined") {
                callback = args.pop();
            }
        } else {
    } else {
    if (args.length > 0 && Array.isArray(args[args.length - 1])) {
        args = args.slice(0, -1).concat(args[args.length - 1]);
    }
};
RedisClient.prototype.pub_sub_command = function (command_obj) {
    command_obj.sub_command = true;
};
RedisClient.prototype.end = function () {
};
function Multi(client, args) {
}
exports.Multi = Multi;
function set_union(seta, setb) {
}
commands = set_union(["get", "set", "setnx", "setex", "append", "strlen", "del", "exists", "setbit", "getbit", "setrange", "getrange", "substr",
    "restore", "migrate", "dump", "object", "client", "eval", "evalsha"], require("./lib/commands"));
commands.forEach(function (command) {
    RedisClient.prototype[command] = function (args, callback) {
    };
    RedisClient.prototype[command.toUpperCase()] = RedisClient.prototype[command];
    Multi.prototype[command] = function () {
    };
    Multi.prototype[command.toUpperCase()] = Multi.prototype[command];
});
RedisClient.prototype.select = function (db, callback) {
};
RedisClient.prototype.SELECT = RedisClient.prototype.select;
RedisClient.prototype.auth = function () {
};
RedisClient.prototype.AUTH = RedisClient.prototype.auth;
RedisClient.prototype.hmget = function (arg1, arg2, arg3) {
};
RedisClient.prototype.HMGET = RedisClient.prototype.hmget;
RedisClient.prototype.hmset = function (args, callback) {
    var tmp_args, tmp_keys, i, il, key;
    args = to_array(arguments);
    if (typeof args[args.length - 1] === "function") {
        callback = args[args.length - 1];
        args.length -= 1;
    } else {
        callback = null;
    }
    if (args.length === 2 && typeof args[0] === "string" && typeof args[1] === "object") {
        tmp_args = [ args[0] ];
        tmp_keys = Object.keys(args[1]);
        for (i = 0, il = tmp_keys.length; i < il ; i++) {
            key = tmp_keys[i];
        }
        args = tmp_args;
    }
};
RedisClient.prototype.HMSET = RedisClient.prototype.hmset;
Multi.prototype.hmset = function () {
};
Multi.prototype.HMSET = Multi.prototype.hmset;
Multi.prototype.exec = function (callback) {
    this.queue.forEach(function (args, index) {
        var command = args[0], obj;
        if (typeof args[args.length - 1] === "function") {
            args = args.slice(1, -1);
        } else {
            args = args.slice(1);
        }
        if (args.length === 1 && Array.isArray(args[0])) {
            args = args[0];
        }
        if (command.toLowerCase() === 'hmset' && typeof args[1] === 'object') {
        }
    }, this);
};
