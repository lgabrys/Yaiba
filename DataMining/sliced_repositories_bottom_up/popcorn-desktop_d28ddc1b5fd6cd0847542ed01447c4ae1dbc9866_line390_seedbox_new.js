(function (App) {
    'use strict';

        exitWhenDoneInt,
        updateInterval;
    var formatBytes = function (bytes, decimals) {
        if (!bytes || bytes < 1) {
        }
    };

        onAttach: function () {
            this.addTorrentHooks();
            if ($('.loading .maximize-icon').is(':visible') || $('.player .maximize-icon').is(':visible')) {
                let currentHash;
                try { currentHash = App.LoadingView.model.attributes.streamInfo.attributes.torrentModel.attributes.torrent.infoHash; } catch(err) {}
            }
        },
        addTorrentHooks() {
            updateInterval = setInterval(() => {
            }, 1000);
        },
        getTorrentListItem(torrent) {
            return $(`.tab-torrent#${torrent.infoHash}`);
        },
        pauseTorrent(torrent) {
            const removedPeers = [];
            for (const id in torrent._peers) {
                if (torrent._peers[id] && torrent._peers[id].addr) {
                    torrent.removePeer(id);
                }
            }
            if (removedPeers.length > 0) {
                torrent.pctRemovedPeers = removedPeers;
            }
        },
        onResumeTorrentClicked(e, id) {
            const torrent = this.getTorrentFromEvent(e.currentTarget.parentNode.parentNode, id);
            if (torrent) {
                if(torrent.pctRemovedPeers) {
                    const peers = torrent.pctRemovedPeers;
                    torrent.pctRemovedPeers = undefined;
                    for (let peer of peers) {
                    }
                }
            }
        },
        exitWhenDone: function () {
            exitWhenDoneInt = window.setInterval(function () {
                var torrents = App.WebTorrent.torrents;
                var doneTorrents = 0;
                for (const i in torrents) {
                    torrents[i].done || !torrents[i].done && torrents[i].paused ? doneTorrents++ : null;
                }
                if (!$('.loading').is(':visible') && !$('.player').is(':visible') && torrents.length === doneTorrents) {
                    var abortExit = (function () {
                    }.bind(this));
                    var notificationModel = new App.Model.Notification({
                        title: '',
                        body: '<br><font size=4>' + i18n.__('Exiting Popcorn Time...') + '</font><br>(' + i18n.__('does not clear the Cache Folder') + ')<br><br>' + '<span id="timer">30</span> ' + '<span id="timerunit">' + i18n.__('seconds') + '</span> ' + i18n.__('left to cancel this action') + '<br><br>',
                        type: 'danger',
                        showClose: false,
                        buttons: [{ title: i18n.__('Exit Now'), action: function () { win.close(true); } }, { title: i18n.__('Cancel'), action: abortExit }]
                    });
                }
            }, 10000);
        },
