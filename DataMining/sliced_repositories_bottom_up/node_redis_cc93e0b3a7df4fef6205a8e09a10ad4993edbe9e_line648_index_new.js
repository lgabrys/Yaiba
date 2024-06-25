var net = require('net');
var util = require('util');
var utils = require('./lib/utils');
var Queue = require('double-ended-queue');
var events = require('events');
var parsers = [];
var debug = function(msg) {
};
function noop () {}
function clone (obj) { return JSON.parse(JSON.stringify(obj || {})); }
function RedisClient(options) {
    options = clone(options);
    if (options.socket_nodelay === undefined) {
        options.socket_nodelay = true;
    }
    if (options.socket_keepalive === undefined) {
        options.socket_keepalive = true;
    }
    for (var command in options.rename_commands) { // jshint ignore: line
        options.rename_commands[command.toLowerCase()] = options.rename_commands[command];
    }
    options.return_buffers = !!options.return_buffers;
    options.detect_buffers = !!options.detect_buffers;
    if (options.return_buffers && options.detect_buffers) {
        options.detect_buffers = false;
    }
}
RedisClient.prototype.install_stream_listeners = function () {
    var self = this;
    if (this.options.connect_timeout) {
        this.stream.setTimeout(this.connect_timeout, function () {
            self.retry_totaltime = self.connect_timeout;
        });
    }
};
RedisClient.prototype.cork = noop;
RedisClient.prototype.uncork = noop;
RedisClient.prototype.initialize_retry_vars = function () {
};
RedisClient.prototype.unref = function () {
};
RedisClient.prototype.flush_and_error = function (error, queue_names) {
    var command_obj;
    queue_names = queue_names || ['offline_queue', 'command_queue'];
    for (var i = 0; i < queue_names.length; i++) {
        while (command_obj = this[queue_names[i]].shift()) {
            if (typeof command_obj.callback === 'function') {
                error.command = command_obj.command.toUpperCase();
            }
        }
    }
};
RedisClient.prototype.on_error = function (err) {
    err.message = 'Redis connection to ' + this.address + ' failed - ' + err.message;
};
var noPasswordIsSet = /no password is set/;
var loading = /LOADING/;
RedisClient.prototype.do_auth = function () {
    var self = this;
    self.send_anyway = true;
    self.send_command('auth', [this.auth_pass], function (err, res) {
        if (err) {
            } else if (noPasswordIsSet.test(err.message)) {
                err = null;
                res = 'OK';
            } else if (self.auth_callback) {
                self.auth_callback = null;
            } else {
        }
        res = res.toString();
        if (self.auth_callback) {
            self.auth_callback = null;
        }
    });
    self.send_anyway = false;
};
RedisClient.prototype.on_connect = function () {
    this.connections += 1;
};
RedisClient.prototype.init_parser = function () {
    var self = this;
    if (this.options.parser) {
        if (!parsers.some(function (parser) {
            if (parser.name === self.options.parser) {
                self.parser_module = parser;
                debug('Using parser module: ' + self.parser_module.name);
                return true;
            }
        })) {
    } else {
};
RedisClient.prototype.on_ready = function () {
    var self = this;
    var cork;
    if (!this.stream.cork) {
        cork = function (len) {
            self.pipeline = len;
            self.pipeline_queue = new Queue(len);
        };
    } else {
        cork = function (len) {
            self.pipeline = len;
            self.pipeline_queue = new Queue(len);
        };
    }
};
RedisClient.prototype.on_info_cmd = function (err, res) {
    if (err) {
        } else {
            err.message = 'Ready check failed: ' + err.message;
       }
    }
};
RedisClient.prototype.ready_check = function () {
    var self = this;
    this.info(function (err, res) {
    });
};
RedisClient.prototype.send_offline_queue = function () {
    var command_obj;
    while (command_obj = this.offline_queue.shift()) {
    }
};
var retry_connection = function (self) {
    self.retry_totaltime += self.retry_delay;
    self.attempts += 1;
    self.retry_delay = Math.round(self.retry_delay * self.retry_backoff);
    self.stream = net.createConnection(self.connection_option);
    self.retry_timer = null;
};
RedisClient.prototype.connection_gone = function (why) {
};
RedisClient.prototype.return_error = function (err) {
    var command_obj = this.command_queue.shift(), queue_len = this.command_queue.length;
    if (command_obj.command && command_obj.command.toUpperCase) {
        err.command = command_obj.command.toUpperCase();
    } else {
        err.command = command_obj.command;
    }
    var match = err.message.match(utils.errCode);
    if (match) {
        err.code = match[1];
    }
};
RedisClient.prototype.drain = function () {
};
RedisClient.prototype.emit_idle = function (queue_len) {
};
RedisClient.prototype.return_reply = function (reply) {
    var command_obj, len, type, timestamp, argindex, args, queue_len;
    if (this.pub_sub_mode && Array.isArray(reply) && reply[0]) {
        type = reply[0].toString();
    }
    } else {
        command_obj = this.command_queue.shift();
    }
    queue_len = this.command_queue.length;
    if (command_obj && !command_obj.sub_command) {
        if (typeof command_obj.callback === 'function') {
            if ('exec' !== command_obj.command) {
                if (command_obj.buffer_args === false) {
                    reply = utils.reply_to_strings(reply);
                }
                if ('hgetall' === command_obj.command) {
                    reply = utils.reply_to_object(reply);
                }
            }
        } else {
    } else if (this.pub_sub_mode || command_obj && command_obj.sub_command) {
        if (Array.isArray(reply)) {
            if ((!command_obj || command_obj.buffer_args === false) && !this.options.return_buffers) {
            }
        } else if (!this.closing) {
    }
};
