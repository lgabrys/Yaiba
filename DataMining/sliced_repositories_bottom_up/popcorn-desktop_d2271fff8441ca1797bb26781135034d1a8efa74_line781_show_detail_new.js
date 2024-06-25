(function (App) {
    var ShowDetail = Marionette.View.extend({
        events: {
            'click .close-icon': 'closeDetails',
            'dblclick .tab-episode': 'dblclickEpisode',
        },
        toggleFavorite: function (e) {
            if (e.type) {
            }
        },

        openMagnet: function (e) {
            var torrentUrl = $('.startStreaming').attr('data-torrent').replace(/\&amp;/g, '&');
            if (e.button === 2) { //if right click on magnet link
            } else {
            }
        },
        switchRating: function () {
        },
        onWatched: function (value, channel) {
        },
        startStreaming: function (e) {
            var that = this;
            var title = that.model.get('title');
            var episode = $(e.currentTarget).attr('data-episode');
            var season = $(e.currentTarget).attr('data-season');
            var name = $(e.currentTarget).attr('data-title');
            title += ' - ' + i18n.__('Season %s', season) + ', ' + i18n.__('Episode %s', episode) + ' - ' + name;
            if (AdvSettings.get('playNextEpisodeAuto') && this.model.get('imdb_id').indexOf('mal') === -1) {
                _.each(this.model.get('episodes'), function (value) {
                    var epaInfo = {
                        id: parseInt(value.season) * 100 + parseInt(value.episode),
                        defaultSubtitle: Settings.subtitle_language,
                        episode: value.episode,
                        season: value.season,
                        title: that.model.get('title') + ' - ' + i18n.__('Season %s', value.season) + ', ' + i18n.__('Episode %s', value.episode) + ' - ' + value.title,
                        torrents: value.torrents,
                        extract_subtitle: {
                            type: 'show',
                            imdbid: that.model.get('imdb_id'),
                            tvdbid: (value.tvdb_id || '').toString(),
                            season: value.season,
                            episode: value.episode
                        },
                        episode_id: value.tvdb_id,
                        tvdb_id: that.model.get('tvdb_id'),
                        imdb_id: that.model.get('imdb_id'),
                        device: App.Device.Collection.selected,
                        poster: that.model.get('poster'),
                        backdrop: that.model.get('backdrop') || images.banner,
                        status: that.model.get('status'),
                        type: 'episode'
                    };
                });
            } else {
        },
        downloadTorrent: function(e) {
          App.previousview = App.currentview;
          App.currentview = 'Seedbox';
        },
        toggleEpisodeWatched: function (e) {
        },
        showPlayerList: function(e) {
            if (e.button === 2) {
                App.vent.trigger('notification:show', new App.Model.Notification({
                    title: '',
                    body: i18n.__('Popcorn Time currently supports') + '<span class="smline"></span>' + 'VLC, Fleex player, MPlayer, MPlayerX, MPlayer OSX Ext., IINA, Bomi,<br>mpv, mpv.net, MPC-HC, MPC-BE, SMPlayer, PotPlayer & BSPlayer' + '.<span class="mmline"></span>' + i18n.__('There is also support for Chromecast, AirPlay & DLNA devices.'),
                }));
            }
        },
    });
})(window.App);
