var net = require("net"),
    util = require("./lib/util"),
    Queue = require("./lib/queue"),
    events = require("events"),
    crypto = require("crypto"),
    parsers = [], commands,
exports.debug_mode = false;

function trace() {
}
try {
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
RedisClient.prototype.return_reply = function (reply) {
    var command_obj, len, type, timestamp, argindex, args, queue_len;
    if (this.pub_sub_mode && Array.isArray(reply) && reply.length > 0 && reply[0]) {
        type = reply[0].toString();
    }
    else {
        command_obj = this.command_queue.shift();
    }
    queue_len = this.command_queue.getLength();
    if (command_obj && !command_obj.sub_command) {
        if (typeof command_obj.callback === "function") {
            if (this.options.detect_buffers && command_obj.buffer_args === false) {
            }
        } else if (exports.debug_mode) {
    } else if (this.pub_sub_mode || (command_obj && command_obj.sub_command)) {
};
