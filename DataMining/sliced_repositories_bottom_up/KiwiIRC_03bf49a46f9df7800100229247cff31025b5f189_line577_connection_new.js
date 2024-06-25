var net             = require('net'),
    tls             = require('tls'),
    util            = require('util'),
    dns             = require('dns'),
    EventBinder     = require('./eventbinder.js'),
    IrcCommands     = require('./commands.js'),
    IrcChannel      = require('./channel.js'),
    IrcUser         = require('./user.js'),
    EE              = require('../ee.js'),
    iconv           = require('iconv-lite'),
    Socks;
if (version_values[1] >= 10) {
    Socks = require('socksjs');
}
var IrcConnection = function (hostname, port, ssl, nick, user, options, state, con_num) {
    var that = this;
    EE.call(this,{
        delimiter: ' '
    });
    this.setMaxListeners(0);

    options = options || {};
    // Socket state
    // In process of writing the buffer?
    this.write_buffer_lines_second = 2;
    // User information
    if (!options.encoding || !this.setEncoding(options.encoding)) {
    }

    this.irc_users[this.nick] = new IrcUser(this, '*');
    this.irc_channels = Object.create(null);
};
module.exports.IrcConnection = IrcConnection;
IrcConnection.prototype.applyIrcEvents = function () {
};
IrcConnection.prototype.connect = function () {
    var that = this;
    var socket_connect_event_name = 'connect';

    var dest_addr = this.socks ?

    getConnectionFamily(dest_addr, function getConnectionFamilyCb(err, family, host) {
        var outgoing;
        if (that.outgoing_interface) {
            outgoing = this.outgoing_interface;
        } else if (global.config.outgoing_address) {
            if ((family === 'IPv6') && (global.config.outgoing_address.IPv6)) {
                outgoing = global.config.outgoing_address.IPv6;
            } else {
                outgoing = global.config.outgoing_address.IPv4 || '0.0.0.0';
                host = dest_addr;
            }
            if (typeof outgoing !== 'string' && outgoing.length) {
                outgoing = outgoing[Math.floor(Math.random() * outgoing.length)];
            }

                outgoing = '0.0.0.0';
        } else {
            outgoing = '0.0.0.0';
        }
        if (that.socks) {
            that.socket = Socks.connect({
            }, {host: that.socks.host,
                localAddress: outgoing
            });
        } else {
            if (that.ssl) {
                that.socket = tls.connect({
                });
                socket_connect_event_name = 'secureConnect';
            } else {
                that.socket = net.connect({
                });
            }
        }
        that.socket.on(socket_connect_event_name, function socketConnectCb() {
            that.connected = true;
        });
        that.socket.on('close', function socketCloseCb(had_error) {
            that.connected = false;
        });
    });
};
IrcConnection.prototype.clientEvent = function (event_name, data, callback) {
    data.server = this.con_num;
};
IrcConnection.prototype.write = function (data, force) {
    encoded_buffer = iconv.encode(data + '\r\n', this.encoding);
};
IrcConnection.prototype.flushWriteBuffer = function () {
};
IrcConnection.prototype.end = function (data, callback) {
};
IrcConnection.prototype.dispose = function () {
};
IrcConnection.prototype.disposeSocket = function () {
};
IrcConnection.prototype.setEncoding = function (encoding) {
    var encoded_test;
    try {
        encoded_test = iconv.encode("TEST", encoding);
    } catch (err) {
};
function getConnectionFamily(host, callback) {
}
var rawSocketConnect = function(socket) {
    if (typeof socket.localPort != 'undefined') {
        global.clients.port_pairs[this.identd_port_pair] = this;
    }
};
var socketConnectHandler = function () {
    var that = this,
        connect_data;
    connect_data = {
    };
    connect_data = findWebIrc.call(this, connect_data);
    global.modules.emit('irc authorize', connect_data).done(function ircAuthorizeCb() {
        var gecos = '[www.kiwiirc.com] ' + that.nick;
        if (global.config.default_gecos) {
            gecos = global.config.default_gecos.toString().replace('%n', that.nick);
            gecos = gecos.toString().replace('%h', that.user.hostname);
        }
    });
};
