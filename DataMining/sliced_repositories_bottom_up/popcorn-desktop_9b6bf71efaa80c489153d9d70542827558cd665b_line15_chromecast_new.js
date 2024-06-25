(function (App) {
    var Chromecast = App.Device.Generic.extend({
        _makeID: function (baseID) {
            return 'chromecast-' + Common.md5(baseID);
        },
    });
})(window.App);
