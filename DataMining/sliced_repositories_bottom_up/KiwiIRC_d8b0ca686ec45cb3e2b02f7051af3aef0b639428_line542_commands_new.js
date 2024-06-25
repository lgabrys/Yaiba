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
    'CAP': function (command) {
        var capabilities = command.trailing.replace(/(?:^| )[\-~=]/, '').split(' ');
    },
};
