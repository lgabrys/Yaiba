(function (App) {
    var FileSelector = Marionette.View.extend({
        initialize: function () {
            formatMagnet = function (link) {
                var index = link.indexOf('\&dn=') + 4, // keep display name
                    _link = link.substring(index); // remove everything before dn
                _link = _link.split('\&'); // array of strings starting with &
                _link = _link[0]; // keep only the first (i.e: display name)
                _link = _link.replace(/\+/g, '.'); // replace + by .
                _link = _link.replace(/%5B/g, '[').replace(/%5D/g, ']');
                _link = _link.replace(/%28/g, '(').replace(/%29/g, ')');
                link = _link.replace(/\W$/, ''); // remove trailing non-word char
            };
        },
        onAttach: function () {
            App.Device.Collection.setDevice(Settings.chosenPlayer);
        },
        bitsnoopRequest: function (hash) {

            request({
                method: 'GET',
            });
        },
        startStreaming: function (e) {
            var file = parseInt($(e.currentTarget).attr('data-file'));
        },
        isTorrentStored: function () {

            if (!Settings.droppedTorrent && !Settings.droppedMagnet) {
                $('.store-torrent').hide();
            } else if (Settings.droppedMagnet && Settings.droppedMagnet.indexOf('\&dn=') === -1) {
                var storeTorrent = $('.store-torrent');
            }
        },
        showPlayerList: function(e) {
            if (e.button === 2) {
                App.vent.trigger('notification:show', new App.Model.Notification({
                    title: '',
                    body: i18n.__('Popcorn Time currently supports') + '<br>VLC, Fleex player, MPlayer, MPlayerX, MPlayer OSX Ext., IINA, Bomi,<br>mpv, mpv.net, MPC-HC, MPC-BE, SMPlayer, PotPlayer & BSPlayer.<br><br>' + i18n.__('There is also support for Chromecast, AirPlay & DLNA devices.'),e,
                }));
            }
        },
    });
})(window.App);
