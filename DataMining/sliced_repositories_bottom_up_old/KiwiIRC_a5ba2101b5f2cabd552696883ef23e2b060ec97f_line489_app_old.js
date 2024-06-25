var fs = null;
var url = null;
var crypto = null;
var jsp = null;
var pro = null;
var _ = null;
var kiwi = null;
this.init = function (objs) {
	fs = objs.fs;
	url = objs.url;
	crypto = objs.crypto;
	jsp = objs.jsp;
	pro = objs.pro;
	_ = objs._;
	kiwi = require('./kiwi.js');
}
this.setTitle = function () {
	process.title = 'kiwiirc';
}
this.changeUser = function () {
    if (typeof kiwi.config.group !== 'undefined' && kiwi.config.group !== '') {
        try {
        } catch (err) {
    }
};
var ircNumerics = {
    RPL_WELCOME:            '001',
    RPL_MYINFO:             '004',
    RPL_ISUPPORT:           '005',
    RPL_WHOISUSER:          '311',
    RPL_WHOISSERVER:        '312',
    RPL_WHOISOPERATOR:      '313',
    RPL_WHOISIDLE:          '317',
    RPL_ENDOFWHOIS:         '318',
    RPL_WHOISCHANNELS:      '319',
    RPL_NOTOPIC:            '331',
    RPL_TOPIC:              '332',
    RPL_NAMEREPLY:          '353',
    RPL_ENDOFNAMES:         '366',
    RPL_MOTD:               '372',
    RPL_WHOISMODES:         '379',
    ERR_NOSUCHNICK:         '401',
    ERR_CANNOTSENDTOCHAN:   '404',
    ERR_TOOMANYCHANNELS:    '405',
    ERR_NICKNAMEINUSE:      '433',
    ERR_USERNOTINCHANNEL:   '441',
    ERR_NOTONCHANNEL:       '442',
    ERR_NOTREGISTERED:      '451',
    ERR_LINKCHANNEL:        '470',
    ERR_CHANNELISFULL:      '471',
    ERR_INVITEONLYCHAN:     '473',
    ERR_BANNEDFROMCHAN:     '474',
    ERR_BADCHANNELKEY:      '475',
    ERR_CHANOPRIVSNEEDED:   '482',
    RPL_STARTTLS:           '670'
};
this.parseIRCMessage = function (websocket, ircSocket, data) {
    var msg, regex, opts, options, opt, i, j, matches, nick, users, chan, channel, params, prefix, prefixes, nicklist, caps, rtn, obj;
    regex = /^(?::(?:([a-z0-9\x5B-\x60\x7B-\x7D\.\-]+)|([a-z0-9\x5B-\x60\x7B-\x7D\.\-]+)!([a-z0-9~\.\-_|]+)@?([a-z0-9\.\-:\/]+)?) )?(\S+)(?: (?!:)(.+?))?(?: :(.+))?$/i;
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
            nick =  msg.params.split(' ')[0];
            opts = msg.params.split(" ");
            options = [];
            for (i = 0; i < opts.length; i++) {
                opt = opts[i].split("=", 2);
                opt[0] = opt[0].toUpperCase();
                ircSocket.IRC.options[opt[0]] = (typeof opt[1] !== 'undefined') ? opt[1] : true;
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
        case ircNumerics.RPL_WHOISCHANNELS:
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
            caps = kiwi.config.cap_options;
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
};
this.ircSocketDataHandler = function (data, websocket, ircSocket) {
    var i;
    if ((ircSocket.holdLast) && (ircSocket.held !== '')) {
        data = ircSocket.held + data;
        ircSocket.holdLast = false;
        ircSocket.held = '';
    }
    if (data.substr(-1) !== '\n') {
        ircSocket.holdLast = true;
    }
    data = data.split("\n");
    for (i = 0; i < data.length; i++) {
        if (data[i]) {
            if ((ircSocket.holdLast) && (i === data.length - 1)) {
                ircSocket.held = data[i];
            }
        }
    }
};
this.httpHandler = function (request, response) {
    var uri, uri_parts, subs, useragent, agent, server_set, server, nick, debug, touchscreen, hash,
        min = {}, public_http_path;
    if (kiwi.config.handle_http) {
        uri = url.parse(request.url, true);
        uri_parts = uri.pathname.split('/');
        subs = uri.pathname.substr(0, 4);
        if (uri.pathname === '/js/all.js') {
            if (kiwi.cache.alljs === '') {
                public_http_path = kiwi.kiwi_root + '/' + kiwi.config.public_http;
                min.util = fs.readFileSync(public_http_path + 'js/util.js');
                min.gateway = fs.readFileSync(public_http_path + 'js/gateway.js');
                min.front = fs.readFileSync(public_http_path + 'js/front.js');
                min.iscroll = fs.readFileSync(public_http_path + 'js/iscroll.js');
                min.ast = jsp.parse(min.util + min.gateway + min.front + min.iscroll);
                min.ast = pro.ast_mangle(min.ast);
                min.ast = pro.ast_squeeze(min.ast);
                min.final_code = pro.gen_code(min.ast);
                kiwi.cache.alljs = min.final_code;
                hash = crypto.createHash('md5').update(kiwi.cache.alljs);
                kiwi.cache.alljs_hash = hash.digest('base64');
            }
            if (request.headers['if-none-match'] === kiwi.cache.alljs_hash) {
                response.statusCode = 304;
            } else {
        } else if ((subs === '/js/') || (subs === '/css') || (subs === '/img')) {
        } else if (uri.pathname === '/' || uri_parts[1] === 'client') {
            useragent = (request.headers) ? request.headers['user-agent'] : '';
        } else if (uri.pathname.substr(0, 10) === '/socket.io') {
    }
};
