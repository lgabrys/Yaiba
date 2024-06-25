var _ = require('lodash'),
handlers = {
    ERR_CHANNELISFULL: function (command) {
        this.irc_connection.emit('server ' + this.irc_connection.irc_host.hostname + ' channel_is_full', {
            reason: command.trailing
        });
    },
    RPL_MAPEND: function (command) {
        var params = _.clone(command.params);
    },
};
function getServerTime(command) {
    var time;
    if (capContainsAny.call(this, ['server-time', 'znc.in/server-time', 'znc.in/server-time-iso'])) {
        time = _.find(command.tags, function (tag) {
            return tag.tag === 'time';
        });
        time = time ? time.value : undefined;
        if (typeof time === 'string') {
            if (time.indexOf('T') > -1) {
                time = parseISO8601(time);
            }
        }
    }
}
