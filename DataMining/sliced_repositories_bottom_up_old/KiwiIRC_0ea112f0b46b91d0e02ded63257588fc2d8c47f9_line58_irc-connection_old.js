    events  = require('events'),
    util    = require('util');
var IRCConnection = function (hostname, port, ssl, nick, user, pass, webirc) {
    var that = this;
    events.EventEmitter.call(this);

    if (ssl) {
    } else {
        this.socket.on('connect', function () {
        });
    }
    this.socket.on('error', function () {
        var a = Array.prototype.slice.call(arguments);
        a.unshift('error');
        that.emit.apply(this, a);
    });
    this.socket.on('data', function () {
    });
    this.socket.on('close', function () {
    });
    this.ssl = !(!ssl);
};
IRCConnection.prototype.write = function (data, callback) {
};
IRCConnection.prototype.end = function (data, callback) {
}
var write = function (data, encoding, callback) {
};
