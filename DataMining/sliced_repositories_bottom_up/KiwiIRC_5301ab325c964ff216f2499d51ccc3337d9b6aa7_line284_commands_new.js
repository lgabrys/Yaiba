    irc_numerics,
    IrcCommands,
    handlers,
irc_numerics = {
};
IrcCommands = function (irc_connection) {
};
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
    'RPL_LIST': function (command) {
        this.irc_connection.emit('server ' + this.irc_connection.irc_host.hostname + ' list_channel', {
            channel: command.params[1],
            num_users: parseInt(command.params[2], 10),
            topic: command.params[3] || ''
        });
    },
};
