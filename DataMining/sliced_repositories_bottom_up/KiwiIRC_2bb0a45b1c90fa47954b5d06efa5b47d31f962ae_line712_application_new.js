(function () {

    _kiwi.model.Application = Backbone.Model.extend({
        /** _kiwi.view.Application */
        initialize: function (options) {

        },
        initializeInterfaces: function () {
            _kiwi.gateway = new _kiwi.model.Gateway();
        },

        initializeGlobals: function () {
            _kiwi.global.connections = this.connections;
            _kiwi.global.panels = this.panels;
            _kiwi.global.panels.applets = this.applet_panels;
            _kiwi.global.components.Applet = _kiwi.model.Applet;
            _kiwi.global.components.Panel =_kiwi.model.Panel;
        },
        panels: (function() {
            var fn = function(panel_type) {
                panel_type = panel_type || 'connections';
                switch (panel_type) {
                }
            };
        })(),
        bindGatewayCommands: function (gw) {
            gw.on('kiwi:jumpserver', function (data) {
                var serv;
                serv = data.kiwi_server;
                    serv = serv.substring(0, serv.length-1);
                if (data.force) {
                    var jump_server_interval = Math.random() * (360 - 300) + 300;
                    setTimeout(function forcedReconnect() {
                        setTimeout(function forcedReconnectPartTwo() {
                            _kiwi.app.kiwi_server = serv;
                        }, 5000);
                    }, jump_server_interval * 1000);
                }
            });
        },
    });
    function actionCommand (ev) {
        if (_kiwi.app.panels().active.isServer()) {
            return;
        }
        var panel = _kiwi.app.panels().active;
        panel.addMsg('', styleText('action', {'%N': _kiwi.app.connections.active_connection.get('nick'), '%T': ev.params.join(' ')}), 'action');
    }
})();
