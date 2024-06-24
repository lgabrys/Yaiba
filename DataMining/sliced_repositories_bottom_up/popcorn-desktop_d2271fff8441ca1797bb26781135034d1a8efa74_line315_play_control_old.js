(function(App) {
  App.View.PlayControl = Marionette.View.extend({
    initialize: function() {
      subtitleProvider.detail(
        this.model.get('imdb_id'),
      );
      this.model.on(
      );
    },
    onAttach: function() {
      this.setUiStates();
      this.model.on('change:subtitle', this.loadSubDropdown.bind(this));
    },
    downloadTorrent: function() {
      App.previousview = App.currentview;
      App.currentview = 'Seedbox';
    },
    showPlayerList: function(e) {
      if (e.button === 2) {
        App.vent.trigger('notification:show', new App.Model.Notification({
          title: '',
          body: i18n.__('Popcorn Time currently supports') + '<br>VLC, Fleex player, MPlayer, MPlayerX, MPlayer OSX Ext., IINA, Bomi,<br>mpv, mpv.net, MPC-HC, MPC-BE, SMPlayer, PotPlayer & BSPlayer.<br><br>' + i18n.__('There is also support for Chromecast, AirPlay & DLNA devices.'),
        }));
      }
    },
  });
})(window.App);
