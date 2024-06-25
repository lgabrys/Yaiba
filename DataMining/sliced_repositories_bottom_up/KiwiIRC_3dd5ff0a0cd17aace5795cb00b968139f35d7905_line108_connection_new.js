var IrcConnection = function (hostname, port, ssl, nick, user, pass) {
};
IrcConnection.prototype.write = function (data, callback) {
};
IrcConnection.prototype.end = function (data, callback) {
};
IrcConnection.prototype.dispose = function () {
};
var connect_handler = function () {
    var that = this,
        connect_data;
    connect_data = {
    };
    connect_data = findWebIrc(connect_data);
    this.registration_timeout = setTimeout(function () {
        that.register();
    }, 1000);
};
