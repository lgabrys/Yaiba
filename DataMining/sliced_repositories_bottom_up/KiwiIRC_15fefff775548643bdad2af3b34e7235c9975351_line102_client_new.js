    _                = require('underscore'),
    IrcConnection    = require('./irc/connection.js').IrcConnection,
function kiwiCommand(command, callback) {
    var that = this;
    if (typeof callback !== 'function') {
        callback = function () {};
    }
    switch (command.command) {
		case 'connect':
			if (command.hostname && command.port && command.nick) {
				var con = new IrcConnection(command.hostname, command.port, command.ssl,
					command.nick, {hostname: this.websocket.handshake.revdns, address: this.websocket.handshake.address.address},
					command.password);
			}
    }
};
