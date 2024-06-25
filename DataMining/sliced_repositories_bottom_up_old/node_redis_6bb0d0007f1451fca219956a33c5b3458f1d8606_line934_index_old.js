var util = require('util');
var utils = require('./lib/utils');
var errorClasses = require('./lib/customErrors');
var EventEmitter = require('events');
var Parser = require('redis-parser');
var commands = require('redis-commands');
var debug = require('./lib/debug');

if (typeof EventEmitter !== 'function') {
    EventEmitter = EventEmitter.EventEmitter;
}
function noop () {}
exports.debug_mode = /\bredis\b/i.test(process.env.NODE_DEBUG);
function RedisClient (options, stream) {
    options = utils.clone(options);
    for (var tls_option in options.tls) {
        if (tls_option === 'port' || tls_option === 'host' || tls_option === 'path' || tls_option === 'family') {
            options[tls_option] = options.tls[tls_option];
        }
    }
    if (stream) {
        options.stream = stream;
    } else if (options.path) {
    this.connection_id = RedisClient.connection_id++;
    if (options.socket_nodelay === undefined) {
        options.socket_nodelay = true;
    } else if (!options.socket_nodelay) { // Only warn users with this set to false
    if (options.socket_keepalive === undefined) {
        options.socket_keepalive = true;
    }
    for (var command in options.rename_commands) {
        options.rename_commands[command.toLowerCase()] = options.rename_commands[command];
    }
    options.return_buffers = !!options.return_buffers;
    options.detect_buffers = !!options.detect_buffers;
    if (options.return_buffers && options.detect_buffers) {
        options.detect_buffers = false;
    }
}
RedisClient.connection_id = 0;
function create_parser (self) {
    return new Parser({
        returnFatalError: function (err) {
            err.message += '. Please report this.';
            self.ready = false;
        },
    });
}
RedisClient.prototype.create_stream = function () {
    var self = this;
    if (this.options.connect_timeout) {
        this.stream.setTimeout(this.connect_timeout, function () {
            self.retry_totaltime = self.connect_timeout;
        });
    }
    this.stream.once(connect_event, function () {
        self.times_connected++;
    });
};
RedisClient.prototype.handle_reply = function (reply, command) {
    if (command === 'hgetall') {
        reply = utils.reply_to_object(reply);
    }
};
RedisClient.prototype.cork = noop;
RedisClient.prototype.uncork = noop;
RedisClient.prototype.initialize_retry_vars = function () {
};
RedisClient.prototype.warn = function (msg) {
    var self = this;
};
RedisClient.prototype.flush_and_error = function (error_attributes, options) {
    options = options || {};
    var aggregated_errors = [];
    var queue_names = options.queues || ['command_queue', 'offline_queue']; // Flush the command_queue first to keep the order intakt
    for (var i = 0; i < queue_names.length; i++) {
        if (queue_names[i] === 'command_queue') {
            error_attributes.message += ' It might have been processed.';
        } else { // As the command_queue is flushed first, remove this for the offline queue
            error_attributes.message = error_attributes.message.replace(' It might have been processed.', '');
        }
    }
    if (exports.debug_mode && aggregated_errors.length) {
        var error;
        if (aggregated_errors.length === 1) {
            error = aggregated_errors[0];
        } else {
            error_attributes.message = error_attributes.message.replace('It', 'They').replace(/command/i, '$&s');
            error = new errorClasses.AggregateError(error_attributes);
            error.errors = aggregated_errors;
        }
        this.emit('error', error);
    }
};
RedisClient.prototype.on_error = function (err) {
    err.message = 'Redis connection to ' + this.address + ' failed - ' + err.message;
};
RedisClient.prototype.on_connect = function () {
};
RedisClient.prototype.on_ready = function () {
    var self = this;
    this.cork = function () {
        self.pipeline = true;
    };
    this.uncork = function () {
        self.pipeline = false;
        self.fire_strings = true;
    };
};
RedisClient.prototype.on_info_cmd = function (err, res) {
    if (err) {
        err.message = 'Ready check failed: ' + err.message;
    }
};
RedisClient.prototype.ready_check = function () {
    var self = this;
    this.info(function (err, res) {
    });
};
RedisClient.prototype.send_offline_queue = function () {
    for (var command_obj = this.offline_queue.shift(); command_obj; command_obj = this.offline_queue.shift()) {
    }
};
var retry_connection = function (self, error) {
    var reconnect_params = {
        delay: self.retry_delay,
        attempt: self.attempts,
        error: error
    };
    if (self.options.camel_case) {
        reconnect_params.totalRetryTime = self.retry_totaltime;
        reconnect_params.timesConnected = self.times_connected;
    } else {
        reconnect_params.total_retry_time = self.retry_totaltime;
        reconnect_params.times_connected = self.times_connected;
    }
    self.retry_totaltime += self.retry_delay;
    self.attempts += 1;
    self.retry_delay = Math.round(self.retry_delay * self.retry_backoff);
    self.retry_timer = null;
};
RedisClient.prototype.connection_gone = function (why, error) {
    error = error || null;
    if (typeof this.options.retry_strategy === 'function') {
        if (typeof this.retry_delay !== 'number') {
            if (this.retry_delay instanceof Error) {
                error = this.retry_delay;
            }
        }
    }
};
RedisClient.prototype.return_error = function (err) {
    var command_obj = this.command_queue.shift();
    if (command_obj.error) {
        err.stack = command_obj.error.stack.replace(/^Error.*?\n/, 'ReplyError: ' + err.message + '\n');
    }
    err.command = command_obj.command.toUpperCase();
    if (command_obj.args && command_obj.args.length) {
        err.args = command_obj.args;
    }
    if (this.pub_sub_mode > 1) {
        this.pub_sub_mode--;
    }
    var match = err.message.match(utils.err_code);
    if (match) {
        err.code = match[1];
    }
};
RedisClient.prototype.drain = function () {
};
RedisClient.prototype.emit_idle = function () {
};
function normal_reply (self, reply) {
    var command_obj = self.command_queue.shift();
    if (typeof command_obj.callback === 'function') {
        if (command_obj.command !== 'exec') {
            reply = self.handle_reply(reply, command_obj.command, command_obj.buffer_args);
        }
    } else {
}
RedisClient.prototype.return_reply = function (reply) {
    } else if (this.pub_sub_mode !== 1) {
        this.pub_sub_mode--;
    } else if (!(reply instanceof Array) || reply.length <= 2) {
};
function handle_offline_command (self, command_obj) {
    var command = command_obj.command;
    var err, msg;
    if (self.closing || !self.enable_offline_queue) {
        command = command.toUpperCase();
        if (!self.closing) {
            if (self.stream.writable) {
                msg = 'The connection is not yet established and the offline queue is deactivated.';
            } else {
                msg = 'Stream not writeable.';
            }
        } else {
            msg = 'The connection is already closed.';
        }
        err = new errorClasses.AbortError({
        });
        if (command_obj.args.length) {
            err.args = command_obj.args;
        }
    } else {
    self.should_buffer = true;
}
RedisClient.prototype.internal_send_command = function (command_obj) {
    var arg, prefix_keys;
    var i = 0;
    var args = command_obj.args;
    var command = command_obj.command;
    var len = args.length;
    var args_copy = new Array(len);
    if (process.domain && command_obj.callback) {
        command_obj.callback = process.domain.bind(command_obj.callback);
    }
    for (i = 0; i < len; i += 1) {
        if (typeof args[i] === 'string') {
            if (args[i].length > 30000) {
                args_copy[i] = new Buffer(args[i], 'utf8');
            } else {
                args_copy[i] = args[i];
            }
        } else if (typeof args[i] === 'object') { // Checking for object instead of Buffer.isBuffer helps us finding data types that we can't handle properly
            if (args[i] instanceof Date) { // Accept dates as valid input
                args_copy[i] = args[i].toString();
            } else if (args[i] === null) {
                args_copy[i] = 'null'; // Backwards compatible :/
            } else if (Buffer.isBuffer(args[i])) {
                args_copy[i] = args[i];
                command_obj.buffer_args = true;
            } else {
                args_copy[i] = args[i].toString(); // Backwards compatible :/
            }
        } else if (typeof args[i] === 'undefined') {
            args_copy[i] = 'undefined'; // Backwards compatible :/
        } else {
            args_copy[i] = '' + args[i];
        }
    }
    if (this.options.prefix) {
        prefix_keys = commands.getKeyIndexes(command, args_copy);
        for (i = prefix_keys.pop(); i !== undefined; i = prefix_keys.pop()) {
            args_copy[i] = this.options.prefix + args_copy[i];
        }
    }
    if (typeof this.options.rename_commands !== 'undefined' && this.options.rename_commands[command]) {
    }
};
