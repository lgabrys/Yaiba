var net     = require('net'),
    tls     = require('tls'),
    events  = require('events'),
    util    = require('util');

var IrcConnection = function (hostname, port, ssl, nick, user, pass, webirc) {
    var that = this;
    events.EventEmitter.call(this);
    
    if (ssl) {
        this.socket = tls.connect(port, hostname, {}, connect_handler);
    } else {
        this.socket = net.createConnection(port, hostname);
        this.socket.on('connect', function () {
            connect_handler.apply(that, arguments);
        });
    }
    
    this.socket.on('error', function (event) {
        that.emit('error', event);
    });
    
    this.socket.setEncoding('utf-8');
    
    this.socket.on('data', function () {
        parse.apply(that, arguments);
    });
    
    this.socket.on('close', function () {
        that.emit('close');
    });
    
    this.connected = false;
    this.registered = false;
    this.nick = nick;
    this.user = user;
    this.ssl = !(!ssl);
    this.options = Object.create(null);
    
    this.webirc = webirc;
    this.password = pass;
    this.hold_last = false;
    this.held_data = '';
};
util.inherits(IrcConnection, events.EventEmitter);

module.exports.IrcConnection = IrcConnection;


IrcConnection.prototype.write = function (data, callback) {
    write.call(this, data + '\r\n', 'utf-8', callback);
};

IrcConnection.prototype.end = function (data, callback) {
    console.log('Closing IRC socket');
    end.call(this, data + '\r\n', 'utf-8', callback);
};

var write = function (data, encoding, callback) {
    this.socket.write(data, encoding, callback);
};

var end = function (data, encoding, callback) {
    this.socket.end(data, encoding, callback);
};


var connect_handler = function () {
    if (this.webirc) {
        this.write('WEBIRC ' + this.webirc.pass + ' KiwiIRC ' + this.user.hostname + ' ' + this.user.address);
    }
    if (this.password) {
        this.write('PASS ' + this.password);
    }
    //this.write('CAP LS');
    this.write('NICK ' + this.nick);
    this.write('USER kiwi_' + this.nick.replace(/[^0-9a-zA-Z\-_.]/, '') + ' 0 0 :' + this.nick);
    
    this.connected = true;
    console.log("IrcConnection.emit('connected')");
    this.emit('connected');
};

parse_regex = /^(?::(?:([a-z0-9\x5B-\x60\x7B-\x7D\.\-]+)|([a-z0-9\x5B-\x60\x7B-\x7D\.\-]+)!([a-z0-9~\.\-_|]+)@?([a-z0-9\.\-:\/]+)?) )?(\S+)(?: (?!:)(.+?))?(?: :(.+))?$/i;

var parse = function (data) {
    var i,
        msg,
		msg2,
		trm;
    
    if ((this.hold_last) && (this.held_data !== '')) {
        data = this.held_data + data;
        this.hold_last = false;
        this.held_data = '';
    }
    if (data.substr(-1) !== '\n') {
        this.hold_last = true;
    }
    data = data.split("\n");
    for (i = 0; i < data.length; i++) {
        if (data[i]) {
            if ((this.hold_last) && (i === data.length - 1)) {
                this.held_data = data[i];
                break;
            }

            // We have a complete line of data, parse it!
            msg = parse_regex.exec(data[i].replace(/^\r+|\r+$/, ''));
            if (msg) {
                msg = {
                    prefix:     msg[1],
                    nick:       msg[2],
                    ident:      msg[3],
                    hostname:   msg[4] || '',
                    command:    msg[5],
                    params:     msg[6] || '',
                    trailing:   (msg[7]) ? msg[7].trim() : ''
                };
                msg.params = msg.params.split(' ');

                this.emit('irc_' + msg.command.toUpperCase(), msg);
            } else {
                console.log("Malformed IRC line: " + data[i].replace(/^\r+|\r+$/, ''));
            }
        }
    }
};
