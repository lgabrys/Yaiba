var debug = require('./debug');
var loading = /LOADING/;
var RedisClient = require('../').RedisClient;
RedisClient.prototype.multi = RedisClient.prototype.MULTI = function multi (args) {
};
RedisClient.prototype.batch = RedisClient.prototype.BATCH = function batch (args) {
};
RedisClient.prototype.select = RedisClient.prototype.SELECT = function select (db, callback) {
};
RedisClient.prototype.monitor = RedisClient.prototype.MONITOR = function monitor (callback) {
};
Multi.prototype.monitor = Multi.prototype.MONITOR = function monitor (callback) {
    if (this.exec !== this.exec_transaction) {
        var call_on_write = function () {
        };
    }
};
RedisClient.prototype.QUIT = RedisClient.prototype.quit = function quit (callback) {
};
function info_callback (self, callback) {
    return function (err, res) {
        if (res) {
            var obj = {};
            var lines = res.toString().split('\r\n');
            var line, parts, sub_parts;
            for (var i = 0; i < lines.length; i++) {
                parts = lines[i].split(':');
                if (parts[1]) {
                    if (parts[0].indexOf('db') === 0) {
                        sub_parts = parts[1].split(',');
                        obj[parts[0]] = {};
                        while (line = sub_parts.pop()) {
                            line = line.split('=');
                            obj[parts[0]][line[0]] = +line[1];
                        }
                    } else {
                        obj[parts[0]] = parts[1];
                    }
                }
            }
            obj.versions = [];
            if (obj.redis_version) {
                obj.redis_version.split('.').forEach(function (num) {
                    obj.versions.push(+num);
                });
            }
        } else {
    };
}
RedisClient.prototype.info = RedisClient.prototype.INFO = function info (section, callback) {
    if (typeof section === 'function') {
        callback = section;
    } else if (section !== undefined) {
};
function auth_callback (self, pass, user, callback) {
    return function (err, res) {
        if (err) {
            if (no_password_is_set.test(err.message)) {
                err = null;
                res = 'OK';
            } else if (loading.test(err.message)) {
                setTimeout(function () {
                    self.auth(pass, user, callback);
                }, 100);
            }
        }
    };
}
