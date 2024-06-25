var kiwi = null;
this.init = function (objs) {
    kiwi = require('./kiwi.js');
};
this.httpHandler = function (request, response) {
    var uri, uri_parts, subs, useragent, agent, server_set, server, nick, debug, touchscreen, hash,
        min = {}, public_http_path, port, ssl, host, obj, args, ircuri, pass, target, modifiers, query,
        secure = (typeof request.client.encrypted === 'object');
        if (kiwi.config.handle_http) {
            args = {request: request, response: response, ssl: secure};
        }
};
