var utils = require('./utils');
var RedisClient = require('../').RedisClient;
RedisClient.prototype.send_command = RedisClient.prototype.sendCommand = function (command, args, callback) {
    command = command.toLowerCase();
    if (!Array.isArray(args)) {
        if (args === undefined || args === null) {
            args = [];
        } else if (typeof args === 'function' && callback === undefined) {
            callback = args;
            args = [];
        } else {
    }
    if (typeof callback === 'function') {
        args = args.concat([callback]); // Prevent manipulating the input array
    }
};
RedisClient.prototype.end = function (flush) {
};
RedisClient.prototype.unref = function () {
};
RedisClient.prototype.duplicate = function (options, callback) {
    if (typeof options === 'function') {
        callback = options;
        options = null;
    }
    var existing_options = utils.clone(this.options);
    options = utils.clone(options);
    for (var elem in options) {
        existing_options[elem] = options[elem];
    }
    var client = new RedisClient(existing_options);
    client.selected_db = options.db || this.selected_db;
};
