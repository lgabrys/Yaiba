
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
    if (self.options.parser) {
        if (! parsers.some(function (parser) {
            if (parser.name === self.options.parser) {
                parser_module = parser;
                if (exports.debug_mode) {
                    console.log("Using parser module: " + parser_module.name);
                }
                return true;
            }
        })) {
    } else {
}
exports.RedisClient = RedisClient;
RedisClient.prototype.do_auth = function () {
    var self = this;
    self.send_anyway = true;
    self.send_command("auth", [this.auth_pass], function (err, res) {
        if (self.auth_callback) {
            self.auth_callback = null;
        }
        if (self.options.no_ready_check) {
            self.ready = true;
        } else {
    });
    self.send_anyway = false;
};
RedisClient.prototype.on_connect = function () {
};
RedisClient.prototype.ready_check = function () {
    var self = this;
    function send_info_cmd() {
        self.send_anyway = true;  // secret flag to send_command to send something even if not "ready"
        self.info(function (err, res) {
            var lines = res.toString().split("\r\n"), obj = {}, retry_time;
            lines.forEach(function (line) {
                var parts = line.split(':');
                if (parts[1]) {
                    obj[parts[0]] = parts[1];
                }
            });
            obj.versions = [];
            self.server_info = obj;
            if (!obj.loading || (obj.loading && obj.loading === "0")) {
                if (exports.debug_mode) {
                    console.log("Redis server ready.");
                }
                self.ready = true;

                self.send_offline_queue();
                self.emit("ready");
            } else {
                retry_time = obj.loading_eta_seconds * 1000;
                if (retry_time > 1000) {
                    retry_time = 1000;
                }
            }
        });
        self.send_anyway = false;
    }
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
        self.retry_timer = null;
    }, this.current_retry_delay);
};
RedisClient.prototype.on_data = function (data) {
};
RedisClient.prototype.return_error = function (err) {
    var command_obj = this.command_queue.shift(), queue_len = this.command_queue.getLength();
};
RedisClient.prototype.return_reply = function (reply) {
    var command_obj = this.command_queue.shift(),
        obj, i, len, key, val, type, timestamp, args, queue_len = this.command_queue.getLength();
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
    } else if (this.subscriptions || (command_obj && command_obj.sub_command)) {
        if (Array.isArray(reply)) {
            type = reply[0].toString();
        } else if (! this.closing) {
    } else if (this.monitoring) {
        len = reply.indexOf(" ");
        timestamp = reply.slice(0, len);
        args = reply.slice(len + 1).match(/"[^"]+"/g).map(function (elem) {
        });
    } else {
};
function Command(command, args, sub_command, callback) {
    this.command = command;
    this.args = args;
    this.sub_command = sub_command;
    this.callback = callback;
}
RedisClient.prototype.send_command = function (command, args, callback) {
    var arg, this_args, command_obj, i, il, elem_count, stream = this.stream, buffer_args, command_str = "", buffered_writes = 0;
    if (Array.isArray(args)) {
        if (typeof callback === "function") {
        } else if (! callback) {
        } else {
    } else {
};
