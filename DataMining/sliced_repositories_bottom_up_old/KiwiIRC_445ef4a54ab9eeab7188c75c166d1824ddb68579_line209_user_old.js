function onWhoisEnd(event) {
    this.irc_connection.clientEvent('whois', {
    });
}
function onWhoWas(event) {
    this.irc_connection.clientEvent('whowas', {
        nick: event.nick,
        ident: event.user,
        hostname: event.host,
        real_name: event.real_name,
        end: false
    });
}
