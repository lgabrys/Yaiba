(function(App) {
    'use strict';

    var Device = function () {
        this.selected = null;
        this.devices = {};
        this.type = 'generic';

        App.vent.on('device:list', this.list);

        if (this.initialize) {
            this.initialize();
        }
    };

    Device.prototype.startDevice =  function (streamModel) {
        if (! this.selected) {
            return false;
        }

        var src = streamModel.get(src);
        return this.play (this.selected, src[0].url);
    };

    Device.prototype.play = function (device, url) {
        console.error ('PLAY not implemented in generic class');
    };

    Device.prototype.getID = function (device) {
        return device.id;
    };

    Device.prototype.add =  function (device) {
        device = _.extend (device, {PTtype: this.type});
        this.devices[this.getID(device)] = device;
        this.selected = device;

        App.vent.trigger('device:add', device);
    };

    Device.prototype.rm =  function (device) {
        var id = this.getID(device);
        device = this[id];
        delete this[id];
        this.devices[id] = undefined;

        App.vent.trigger('device:rm', device);
    };

    Device.prototype.has = function () {
        return (this.devices.length > 0);
    };

    Device.prototype.list = function () {
        var self = this;
        _.foreach (this.devices, function (device) {
            App.vent.trigger('device:add', device);
        });
    };

    App.Device = {Generic: Device};
})(window.App);
