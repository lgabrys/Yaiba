(function (App) {
    var Chromecast = App.Device.Generic.extend({
        _makeID: function (baseID) {
            return 'chromecast-' + baseID.replace(' ', '-');
        },
    });
})(window.App);
