(function () {
    function msgCommand (ev) {
        var message,
            destination = ev.params[0],
            panel = this.connections.active_connection.panels.getByName(destination) || this.panels().server;
        message = formatToIrcMsg(ev.params.join(' '));
        this.connections.active_connection.gateway.privmsg(destination, message);
    }
})();
