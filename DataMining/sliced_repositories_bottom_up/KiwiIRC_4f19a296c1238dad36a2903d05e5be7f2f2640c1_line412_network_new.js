(function () {

    _kiwi.model.Network = Backbone.Model.extend({
        defaults: {
            connection_id: 0,

        },

        bindGatewayEvents: function () {
            this.gateway.on('connect', onConnect, this);
        },
        createAndJoinChannels: function (channels) {
            if (typeof channels === 'string') {
                channels = channels.split(',');
            }
        },


        rejoinAllChannels: function() {

            this.panels.forEach(function(panel) {
            });
        }
    });
    function onConnect(event) {
    }
    function onCtcpResponse(event) {
        if (_kiwi.gateway.isNickIgnored(event.nick)) {
        }
    }
    function onNotice(event) {
        var panel, channel_name;
        if (!event.from_server) {
            panel = this.panels.getByName(event.target) || this.panels.getByName(event.nick);
            if (event.nick.toLowerCase() == 'chanserv' && event.msg.charAt(0) == '[') {
                channel_name = /\[([^ \]]+)\]/gi.exec(event.msg);
                if (channel_name && channel_name[1]) {
                    channel_name = channel_name[1];
                    panel = this.panels.getByName(channel_name);
                }
            }
            if (!panel) {
                panel = this.panels.server;
            }
        } else {
            panel = this.panels.server;
        }
        if (!event.from_server && panel === this.panels.server && _kiwi.app.panels().active !== this.panels.server)
            _kiwi.app.panels().active.addMsg('[' + (event.nick||'') + ']', event.msg);
    }
)();
