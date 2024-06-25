(function (App) {
        collection = path.join(data_path + '/TorrentCollection/'),
    var TorrentCollection = Marionette.View.extend({
        events: {
            'click .togglesengines': 'togglesengines',
        },
        onAttach: function () {
        },
        onRender: function () {


        },

        onlineSearch: function (e, retry) {
            var omgtorrent = function () {
            };
            $('.notorrents-info,.torrents-info').hide();
            return Promise.all([
                omgtorrent(),
            ]).then(function (results) {

            });
        },
        context_Menu: function (cutLabel, copyLabel, pasteLabel) {
            var menu = new nw.Menu(),

            return menu;
        },

        openFileSelector: function (e) {
            var _file = e.currentTarget.innerText,
        },
        deleteItem: function (e) {
        },
        openCollection: function () {
            App.settings.os === 'windows' ? nw.Shell.openExternal(collection) : nw.Shell.openItem(collection);
        },
    });
})(window.App);
