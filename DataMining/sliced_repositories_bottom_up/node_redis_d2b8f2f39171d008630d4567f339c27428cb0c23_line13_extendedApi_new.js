var RedisClient = require('../').RedisClient;
RedisClient.prototype.send_command = RedisClient.prototype.sendCommand = function (command, args, callback) {
    // Throw to fail early instead of relying in order in this case
    if (typeof command !== 'string') {
        throw new Error('Wrong input type "' + (command !== null && command !== undefined ? command.constructor.name : command) + '" for command name');
    }
};
