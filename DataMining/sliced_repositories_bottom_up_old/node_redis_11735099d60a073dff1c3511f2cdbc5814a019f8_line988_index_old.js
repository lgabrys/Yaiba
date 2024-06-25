var net = require("net"),
    util = require("./lib/util"),
    Queue = require("./lib/queue"),
    to_array = require("./lib/to_array"),
    events = require("events"),
    parsers = [], commands,
    connection_id = 0,
exports.debug_mode = false;
var arraySlice = Array.prototype.slice
function trace() {
}
try {
    require("./lib/parser/hiredis");
} catch (err) {
function RedisClient(stream, options) {
    this.options = options = options || {};
}
exports.RedisClient = RedisClient;
RedisClient.prototype.install_stream_listeners = function() {
    var self = this;
    this.stream.on("drain", function () {
        self.should_buffer = false;
    });
};
RedisClient.prototype.initialize_retry_vars = function () {
};
RedisClient.prototype.unref = function () {
};
RedisClient.prototype.flush_and_error = function (message) {
    var command_obj, error;
    error = new Error(message);
    while (this.offline_queue.length > 0) {
        command_obj = this.offline_queue.shift();
    }
    while (this.command_queue.length > 0) {
        command_obj = this.command_queue.shift();
    }
};
RedisClient.prototype.on_error = function (msg) {
    var message = "Redis connection to " + this.address + " failed - " + msg;
};
RedisClient.prototype.do_auth = function () {
    var self = this;
    self.send_anyway = true;
    self.send_command("auth", [this.auth_pass], function (err, res) {
        if (self.auth_callback) {
            self.auth_callback = null;
        }
    });
    self.send_anyway = false;
};
RedisClient.prototype.on_connect = function () {
};
RedisClient.prototype.init_parser = function () {
    var self = this;
    if (this.options.parser) {
        if (! parsers.some(function (parser) {
            if (parser.name === self.options.parser) {
                self.parser_module = parser;
                if (exports.debug_mode) {
                    console.log("Using parser module: " + self.parser_module.name);
                }
                return true;
            }
        })) {
    } else {
};
RedisClient.prototype.on_ready = function () {
    var self = this;
};
RedisClient.prototype.on_info_cmd = function (err, res) {
    var self = this, obj = {}, lines, retry_time;
    lines = res.toString().split("\r\n");
    lines.forEach(function (line) {
        var parts = line.split(':');
        if (parts[1]) {
            obj[parts[0]] = parts[1];
        }
    });
    obj.versions = [];
    } else {
        retry_time = obj.loading_eta_seconds * 1000;
        if (retry_time > 1000) {
            retry_time = 1000;
        }
    }
};
RedisClient.prototype.ready_check = function () {
    var self = this;
};
RedisClient.prototype.send_offline_queue = function () {
    var command_obj, buffered_writes = 0;
    while (this.offline_queue.length > 0) {
        command_obj = this.offline_queue.shift();
        buffered_writes += !this.send_command(command_obj.command, command_obj.args, command_obj.callback);
    }
};
RedisClient.prototype.connection_gone = function (why) {
    var self = this;
    this.retry_timer = setTimeout(function () {
        self.retry_totaltime += self.retry_delay;
        if (self.connect_timeout && self.retry_totaltime >= self.connect_timeout) {
            self.retry_timer = null;
        }
        self.stream = net.createConnection(self.connectionOption);
        self.retry_timer = null;
    }, this.retry_delay);
};
RedisClient.prototype.on_data = function (data) {
};
RedisClient.prototype.return_error = function (err) {
    var command_obj = this.command_queue.shift(), queue_len = this.command_queue.getLength();
};
function try_callback(callback, reply) {
}
function reply_to_object(reply) {
}
function reply_to_strings(reply) {
    var i;
    if (Array.isArray(reply)) {
        for (i = 0; i < reply.length; i++) {
            if (reply[i] !== null && reply[i] !== undefined) {
                reply[i] = reply[i].toString();
            }
        }
    }
}
RedisClient.prototype.return_reply = function (reply) {
    var command_obj, len, type, timestamp, argindex, args, queue_len;
    if (Array.isArray(reply) && reply.length > 0 && reply[0]) {
        type = reply[0].toString();
    }
    else {
        command_obj = this.command_queue.shift();
    }
    queue_len = this.command_queue.getLength();
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
        if (Array.isArray(reply)) {
            type = reply[0].toString();
        } else if (! this.closing) {
    } else if (this.monitoring) {
        len = reply.indexOf(" ");
        timestamp = reply.slice(0, len);
        argindex = reply.indexOf('"');
        args = reply.slice(argindex + 1, -1).split('" "').map(function (elem) {
        });
    } else {
};
function Command(command, args, sub_command, buffer_args, callback) {
    this.command = command;
    this.args = args;
    this.sub_command = sub_command;
    this.buffer_args = buffer_args;
    this.callback = callback;
}
RedisClient.prototype.send_command = function (command, args, callback) {
    var arg, command_obj, i, il, elem_count, buffer_args, stream = this.stream, command_str = "", buffered_writes = 0, last_arg_type, lcaseCommand;
    if (Array.isArray(args)) {
        } else if (! callback) {
            last_arg_type = typeof args[args.length - 1];
            if (last_arg_type === "function" || last_arg_type === "undefined") {
                callback = args.pop();
            }
        } else {
    } else {
    if (callback && process.domain) callback = process.domain.bind(callback);
    lcaseCommand = command.toLowerCase();
    if ((lcaseCommand === 'sadd' || lcaseCommand === 'srem') && args.length > 0 && Array.isArray(args[args.length - 1])) {
        args = args.slice(0, -1).concat(args[args.length - 1]);
    }
    buffer_args = false;
    for (i = 0, il = args.length, arg; i < il; i += 1) {
        if (Buffer.isBuffer(args[i])) {
            buffer_args = true;
        }
    }
    command_obj = new Command(command, args, false, buffer_args, callback);
    elem_count = args.length + 1;
    command_str = "*" + elem_count + "\r\n$" + command.length + "\r\n" + command + "\r\n";
    if (! buffer_args) { // Build up a string and send entire command in one write
        for (i = 0, il = args.length, arg; i < il; i += 1) {
            arg = args[i];
            if (typeof arg !== "string") {
                arg = String(arg);
            }
            command_str += "$" + Buffer.byteLength(arg) + "\r\n" + arg + "\r\n";
        }
        buffered_writes += !stream.write(command_str);
    } else {
        buffered_writes += !stream.write(command_str);
        for (i = 0, il = args.length, arg; i < il; i += 1) {
            arg = args[i];
            if (!(Buffer.isBuffer(arg) || arg instanceof String)) {
                arg = String(arg);
            }
            if (Buffer.isBuffer(arg)) {
                if (arg.length === 0) {
                    buffered_writes += !stream.write("$0\r\n\r\n");
                } else {
                    buffered_writes += !stream.write("$" + arg.length + "\r\n");
                    buffered_writes += !stream.write(arg);
                    buffered_writes += !stream.write("\r\n");
                }
            } else {
                buffered_writes += !stream.write("$" + Buffer.byteLength(arg) + "\r\n" + arg + "\r\n");
            }
        }
    }
};
RedisClient.prototype.pub_sub_command = function (command_obj) {
    var i, key, command, args;
    command_obj.sub_command = true;
    command = command_obj.command;
    args = command_obj.args;
    if (command === "subscribe" || command === "psubscribe") {
        if (command === "subscribe") {
            key = "sub";
        } else {
            key = "psub";
        }
        for (i = 0; i < args.length; i++) {
        }
    } else {
        if (command === "unsubscribe") {
            key = "sub";
        } else {
            key = "psub";
        }
        for (i = 0; i < args.length; i++) {
        }
    }
};
RedisClient.prototype.end = function () {
};
function Multi(client, args) {
    this._client = client;
    this.queue = [["MULTI"]];
    if (Array.isArray(args)) {
        this.queue = this.queue.concat(args);
    }
}
exports.Multi = Multi;
function set_union(seta, setb) {
}
commands = set_union(["get", "set", "setnx", "setex", "append", "strlen", "del", "exists", "setbit", "getbit", "setrange", "getrange", "substr",
    "restore", "migrate", "dump", "object", "client", "eval", "evalsha"], require("./lib/commands"));
commands.forEach(function (fullCommand) {
    var command = fullCommand.split(' ')[0];
    RedisClient.prototype[command] = function (args, callback) {
        if (Array.isArray(args) && typeof callback === "function") {
        } else {
    };
});
