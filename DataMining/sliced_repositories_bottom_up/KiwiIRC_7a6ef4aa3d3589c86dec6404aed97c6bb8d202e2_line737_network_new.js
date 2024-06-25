(function () {

    _kiwi.model.Network = Backbone.Model.extend({
        defaults: {
            /**
            *   The user prefixes for channel owner/admin/op/voice etc. on this network
            *   @type   Array
            */
            user_prefixes: [
                {symbol: '%', mode: 'h'},
            ],
        },
        reconnect: function(callback_fn) {
            _kiwi.gateway.makeIrcConnection(server_info, function(err, connection_id) {
                if (!err) {
                    that.gateway.dispose();

                    that.set('connection_id', connection_id);
                    that.gateway = _kiwi.global.components.Network(that.get('connection_id'));
                    that.bindGatewayEvents();

                    callback_fn && callback_fn(err);

                } else {
                    console.log("_kiwi.gateway.socket.on('error')", {reason: err});
                    callback_fn && callback_fn(err);
                }
            });
        },

        bindGatewayEvents: function () {
            //this.gateway.on('all', function() {console.log('ALL', this.get('connection_id'), arguments);});

            this.gateway.on('whois', onWhois, this);
        },
    });
    function onOptions(event) {
        var that = this;
        $.each(event.options, function (name, value) {
            switch (name) {
                that.set('user_prefixes', value);
            }
        });
    }
    function onWhois(event) {
    }
    function onWhowas(event) {
        var panel;
        panel = _kiwi.app.panels().active;
        if (event.hostname) {
            panel.addMsg(event.nick, styleText('who', {nick: event.nick, ident: event.ident, host: event.hostname, realname: event.real_name, text: event.msg}), 'whois');
        }
    }
)();
