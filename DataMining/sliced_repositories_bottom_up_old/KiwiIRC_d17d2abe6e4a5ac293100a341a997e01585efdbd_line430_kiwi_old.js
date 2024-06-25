    fs = require('fs'),
    _ = require('./lib/underscore.min.js'),
var config = null,
    config_filename = 'config.json',
    config_dirs = ['/etc/kiwiirc/', __dirname + '/'];
(function () {
    var i;
    for (i in config_dirs) {
        try {
            if (fs.lstatSync(config_dirs[i] + config_filename).isDirectory() === false) {
                config = JSON.parse(fs.readFileSync(config_dirs[i] + config_filename, 'ascii'));
            }
        } catch (e) {
    }
}());
var parseIRCMessage = function (websocket, ircSocket, data) {
    var msg, regex, opts, options, opt, i, j, matches, nick, users, chan, channel, params, prefix, prefixes, nicklist, caps, rtn, obj;
    regex = /^(?::(?:([a-z0-9\x5B-\x60\x7B-\x7D\.\-]+)|([a-z0-9\x5B-\x60\x7B-\x7D\.\-]+)!([a-z0-9~\.\-_|]+)@?([a-z0-9\.\-:]+)?) )?([a-z0-9]+)(?:(?: ([^:]+))?(?: :(.+))?)$/i;
    msg = regex.exec(data);
    if (msg) {
        msg = {
        };
        switch (msg.command.toUpperCase()) {
            if (ircSocket.IRC.CAP.negotiating) {
                ircSocket.IRC.CAP.negotiating = false;
                ircSocket.IRC.CAP.enabled = [];
                ircSocket.IRC.CAP.requested = [];
                ircSocket.IRC.registered = true;
            }
            opts = msg.params.split(" ");
            options = [];
            for (i = 0; i < opts.length; i++) {
                opt = opts[i].split("=", 2);
                opt[0] = opt[0].toUpperCase();
                ircSocket.IRC.options[opt[0]] = opt[1] || true;
                if (_.include(['NETWORK', 'PREFIX', 'CHANTYPES'], opt[0])) {
                    if (opt[0] === 'PREFIX') {
                        regex = /\(([^)]*)\)(.*)/;
                        matches = regex.exec(opt[1]);
                        if ((matches) && (matches.length === 3)) {
                            ircSocket.IRC.options[opt[0]] = [];
                            for (j = 0; j < matches[2].length; j++) {
                            }
                        }
                    }
                }
            }
            params = msg.params.split(" ", 4);
            rtn = {server: '', nick: params[1], idle: params[2]};
            if (params[3]) {
                rtn.logon = params[3];
            }
            params = msg.params.split(" ");
            nick = params[0];
            chan = params[2];
            users = msg.trailing.split(" ");
            prefixes = _.values(ircSocket.IRC.options.PREFIX);
            nicklist = {};
            i = 0;
            _.each(users, function (user) {
                if (_.include(prefix, user.charAt(0))) {
                    prefix = user.charAt(0);
                    user = user.substring(1);
                    nicklist[user] = prefix;
                } else {
                    nicklist[user] = '';
                }
                if (i++ >= 50) {
                    nicklist = {};
                    i = 0;
                }
            });
            params = msg.params.split(" ");
            if (typeof msg.trailing === 'string' && msg.trailing !== '') {
                channel = msg.trailing;
            } else if (typeof msg.params === 'string' && msg.params !== '') {
                channel = msg.params;
            }
            params = msg.params.split(" ");
            obj = {nick: msg.nick, channel: msg.params, topic: msg.trailing};
            obj = {nick: '', channel: msg.params.split(" ")[1], topic: msg.trailing};
            obj = {nick: '', channel: msg.params.split(" ")[1], topic: ''};
            opts = msg.params.split(" ");
            params = {nick: msg.nick};
            switch (opts.length) {
                params.effected_nick = opts[0];
                params.mode = msg.trailing;
                params.channel = opts[0];
                params.mode = opts[1];
                params.channel = opts[0];
                params.mode = opts[1];
                params.effected_nick = opts[2];
            }
            } else {
                obj = {nick: msg.nick, ident: msg.ident, hostname: msg.hostname, channel: msg.params.trim(), msg: msg.trailing};
            }
            caps = config.cap_options;
            options = msg.trailing.split(" ");
            switch (_.last(msg.params.split(" "))) {
                opts = '';
                _.each(_.intersect(caps, options), function (cap) {
                    if (opts !== '') {
                        opts += " ";
                    }
                    opts += cap;
                });
                if (_.last(msg.params.split(" ")) !== '*') {
                    ircSocket.IRC.CAP.requested = [];
                    ircSocket.IRC.CAP.negotiating = false;
                }
                ircSocket.IRC.CAP.requested = [];
                ircSocket.IRC.CAP.negotiating = false;
            }
            params = msg.params.split(" ");
        }
    } else {
    }
};
var ircSocketDataHandler = function (data, websocket, ircSocket) {
    var i;
    if ((ircSocket.holdLast) && (ircSocket.held !== '')) {
        data = ircSocket.held + data;
        ircSocket.holdLast = false;
        ircSocket.held = '';
    }
    if (data.substr(-1) === '\n') {
        ircSocket.holdLast = true;
    }
};
