kiwi.model.Application = function () {
    var that = null;

    var model = function () {
        this.view = null;

        this.initialize = function (options) {
            that = this;
            if (options[0].container) {
                this.set('container', options[0].container);
            }
        };
        this.start = function () {
            if (!getQueryVariable('debug')) {
                manageDebug(false);
            } else {
            kiwi.gateway = new kiwi.model.Gateway();
            this.panels.server.server_login.bind('server_connect', function (event) {
                $script(transport_path, function () {
                    if (!window.io) {
                        return;
                    }
                });
            });
        };
        this.detectKiwiServer = function () {
            } else {
                this.kiwi_server = window.location.protocol + '//' + window.location.host;
            }
        };
        this.initializeGlobals = function () {
            kiwi.global.control = this.controlbox;
        };
        this.bindGatewayCommands = function (gw) {


            gw.on('onuserlist_end', function (event) {

            });
            gw.on('onmode', function (event) {
                function friendlyModeString (event_modes, alt_target) {

                }
            });
            gw.on('onwhois', function (event) {
                } else if (event.chans) {
                } else if (event.server) {
                } else if (event.msg) {
            });
        };
    };
};
