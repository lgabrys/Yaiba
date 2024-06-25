_kiwi.model.Application = function () {
    var that = null;

    var model = function () {
        /** _kiwi.view.Application */
        this.initialize = function (options) {
            that = this;
            if (options[0].container) {
                this.set('container', options[0].container);
            }
        };
        this.start = function () {
            _kiwi.gateway = new _kiwi.model.Gateway();


            this.panels.server.server_login.bind('server_connect', function (event) {
                $script(transport_path, function () {
                    _kiwi.gateway.connect(event.server, event.port, event.ssl, event.password, function (error) {
                        if (error) {
                            kiwiServerNotFound();
                        }
                    });
                });
            });
        };
        function kiwiServerNotFound (e) {
        }
        this.initializeClient = function () {

        };
        this.initializeGlobals = function () {
            _kiwi.global.control = this.controlbox;
            _kiwi.global.gateway = _kiwi.gateway;
            _kiwi.global.panels = this.panels;
            _kiwi.global.components = {
            };
        };
        this.populateDefaultServerSettings = function () {
            if (this.server_settings && this.server_settings.connection) {
                if (this.server_settings.connection.ssl) {
                }
            }
        };
        this.bindGatewayCommands = function (gw) {
            gw.on('onctcp_request', function (event) {
                if (event.msg.toUpperCase() === 'TIME') {
                    gw.ctcp(true, event.type, event.nick, (new Date()).toString());
                }
            });
        };
    };
};
