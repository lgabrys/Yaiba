var util = require('util');
var utils = require('./lib/utils');
var EventEmitter = require('events');
var Parser = require('redis-parser');
if (typeof EventEmitter !== 'function') {
    EventEmitter = EventEmitter.EventEmitter;
}
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
    this.on('newListener', function (event) {
        } else if ((event === 'message_buffer' || event === 'pmessage_buffer' || event === 'messageBuffer' || event === 'pmessageBuffer') && !this.buffers && !this.message_buffers) {
            if (this.reply_parser.name !== 'javascript') {
                return this.warn(
                    'You attached the "' + event + '" listener without the returnBuffers option set to true.\n' +
                );
            }
        }
    });
}
