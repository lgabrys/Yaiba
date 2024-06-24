(function (App) {
    var clipboard = nw.Clipboard.get(),
        collection = path.join(data_path + '/TorrentCollection/'),
    var TorrentCollection = Marionette.View.extend({
        events: {
            'click .togglesengines': 'togglesengines',
        },
        initialize: function () {
            if (!fs.existsSync(collection)) {
                console.debug('TorrentCollection: data directory created');
            }
        },
        onRender: function () {
            if (this.files[0]) {
                $('.notorrents-info').css('display', 'none');
            }

            this.$('.tooltipped').tooltip({
                delay: {
                }
            });
        },
        onlineSearch: function (e, retry) {
            var piratebay = function () {
            };
            var removeDupes = function (arr) {
            };
            var sortBySeeds = function (items) {
                return items.sort(function (a, b) {
                });
            };
            return Promise.all([
                piratebay(),
            ]).then(function (results) {
                var items = sortBySeeds(removeDupes(results));
            });
        },
        context_Menu: function (cutLabel, copyLabel, pasteLabel) {
            var menu = new nw.Menu(),
                cut = new nw.MenuItem({
                }),
                copy = new nw.MenuItem({
                }),
            menu.append(copy);

            return menu;
        },
        openMagnet: function (e) {
            var magnetLink;
            if (e.currentTarget.parentNode.className.indexOf('file-item') !== -1) {
                var _file = e.currentTarget.parentNode.innerText,
                    file = _file.substring(0, _file.length - 2); // avoid ENOENT
                magnetLink = fs.readFileSync(collection + file, 'utf8');
            } else {
                magnetLink = e.currentTarget.parentNode.attributes['data-file'].value;
            }
        },
        pasteItem: function () {
            var data = clipboard.get('text');
            handleTorrent(data, 'text');
        },
    });
})(window.App);
