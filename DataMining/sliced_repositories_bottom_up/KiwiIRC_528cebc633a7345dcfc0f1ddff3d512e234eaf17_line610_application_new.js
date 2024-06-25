_kiwi.model.Application = function () {
    // Set to a reference to this object within initialize()
    var that = null;
    var model = function () {
        this.initialize = function (options) {
            that = this;
        };
        this.start = function () {
            _kiwi.gateway = new _kiwi.model.Gateway();
            this.view.barsHide(true);
        };
        this.initializeGlobals = function () {
            _kiwi.global.connections = this.connections;

            _kiwi.global.panels = this.panels;
            _kiwi.global.panels.applets = this.applet_panels;
            _kiwi.global.components.Applet = _kiwi.model.Applet;
            _kiwi.global.components.Panel =_kiwi.model.Panel;
        };
        function joinCommand (ev) {
            var panels, channel_names;
            channel_names = ev.params.join(' ').split(',');
            panels = that.connections.active_connection.createAndJoinChannels(channel_names);
            if (panels.length)
                panels[panels.length - 1].view.show();
        }
    };
};
