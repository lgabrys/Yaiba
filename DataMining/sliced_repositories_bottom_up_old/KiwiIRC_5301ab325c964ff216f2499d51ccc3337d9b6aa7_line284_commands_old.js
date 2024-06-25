var _ = require('lodash'),
    irc_numerics,
    IrcCommands,
    handlers,

irc_numerics = {
    '001': 'RPL_WELCOME',
    '004': 'RPL_MYINFO',
    '250': 'RPL_STATSCONN',
    '253': 'RPL_LUSERUNKNOWN',
    '311': 'RPL_WHOISUSER',
    '315': 'RPL_ENDOFWHO',
    '318': 'RPL_ENDOFWHOIS',
    '321': 'RPL_LISTSTART',
    '323': 'RPL_LISTEND',
    '328': 'RPL_CHANNEL_URL',
    '330': 'RPL_WHOISACCOUNT',
    '353': 'RPL_NAMEREPLY',
    '406': 'ERR_WASNOSUCHNICK',
};
IrcCommands = function (irc_connection) {
    this.irc_connection = irc_connection;
};
module.exports = IrcCommands;
IrcCommands.prototype.dispatch = function (command, data) {
    command += '';
    if (irc_numerics[command]) {
        command = irc_numerics[command];
    }
};
IrcCommands.addHandler = function (command, handler) {
    handlers[command] = handler;
};
IrcCommands.addNumeric = function (numeric, handler_name) {
    irc_numerics[numeric + ''] = handler_name +'';
};
handlers = {
    'RPL_WELCOME': function (command) {
        this.irc_connection.registered = true;
    },
    'RPL_ISUPPORT': function (command) {
        for (i = 1; i < options.length; i++) {
        }
    },
    'RPL_WHOISSERVER': function (command) {
    },
    'RPL_WHOISCHANNELS':       function (command) {
        this.irc_connection.emit('user ' + command.params[1] + ' whoischannels', {
            nick: command.params[1],
        });
    },
    'RPL_WHOISIDLE': function (command) {
        this.irc_connection.emit('user ' + command.params[1] + ' whoisidle', {
        });
    },
    'RPL_LIST': function (command) {
        this.irc_connection.emit('server ' + this.irc_connection.irc_host.hostname + ' list_channel', {
            channel: command.params[1],
            num_users: parseInt(command.params[2], 10),
            topic: command.params[command.params.length - 1]
        });
    },
};
