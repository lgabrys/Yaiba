(function () {

    _kiwi.model.Network = Backbone.Model.extend({
        defaults: {


        },
        initialize: function () {
        },
        bindGatewayEvents: function () {
            this.gateway.on('away', onAway, this);
        },

        /**
         * Create panels and join the channel
         * This will not wait for the join event to create a panel. This
         * increases responsiveness in case of network lag
         */


    });
    function onCtcpRequest(event) {
        // An ignored user? don't do anything with it
        if (_kiwi.gateway.isNickIgnored(event.nick)) {
            return;
        }
        if (event.msg.toUpperCase() === 'TIME') {
            this.gateway.ctcp(false, event.type, event.nick, (new Date()).toString());
        }
    }
)();
