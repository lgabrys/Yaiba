function Multi (client, args) {
    this._client = client;
    var command, tmp_args;
    if (args) { // Either undefined or an array. Fail hard if it's not an array
        for (var i = 0; i < args.length; i++) {
            command = args[i][0];
            tmp_args = args[i].slice(1);
        }
    }
}
Multi.prototype.hmset = Multi.prototype.HMSET = function hmset () {
    var arr,
        len = 0,
        callback,
        i = 0;
    if (Array.isArray(arguments[0])) {
        arr = arguments[0];
        callback = arguments[1];
    } else if (Array.isArray(arguments[1])) {
        len = arguments[1].length;
        arr = new Array(len + 1);
        arr[0] = arguments[0];
        for (; i < len; i += 1) {
            arr[i + 1] = arguments[1][i];
        }
        callback = arguments[2];
    } else if (typeof arguments[1] === 'object' && (typeof arguments[2] === 'function' || typeof arguments[2] === 'undefined')) {
        arr = [arguments[0]];
        callback = arguments[2];
    } else {
        len = arguments.length;
        if (len !== 0 && (typeof arguments[len - 1] === 'function' || typeof arguments[len - 1] === 'undefined')) {
            len--;
            callback = arguments[len];
        }
        arr = new Array(len);
        for (; i < len; i += 1) {
            arr[i] = arguments[i];
        }
    }
};
function pipeline_transaction_command (self, command, args, index, cb) {
    self._client.send_command(command, args, function (err, reply) {
        if (err) {
            err.position = index;
        }
    });
}
Multi.prototype.exec_atomic = Multi.prototype.EXEC_ATOMIC = Multi.prototype.execAtomic = function exec_atomic (callback) {
    if (this.queue.length < 2) {
        return this.exec_batch(callback);
    }
};
