(function(App) {
    var Device = function () {
    };
    Device.prototype.startDevice =  function (streamModel) {
    };
    Device.prototype.play = function (device, url) {
    };
    Device.prototype.getID = function (device) {
    };
    Device.prototype.add =  function (device) {
        device = _.extend (device, {PTtype: this.type});
    };

    Device.prototype.rm =  function (device) {
        var id = this.getID(device);
        device = this[id];
    };
    Device.prototype.has = function () {
    };
    Device.prototype.list = function () {
        _.each(this.devices, function (device) {
        });
    };
})(window.App);
