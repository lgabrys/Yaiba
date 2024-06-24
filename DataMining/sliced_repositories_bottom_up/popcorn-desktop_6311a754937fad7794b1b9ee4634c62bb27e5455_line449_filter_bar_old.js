(function(App) {
  App.View.FilterBar = Marionette.View.extend({
    events: {
      'click #filterbar-about': 'about',
      'click #filterbar-favorites': 'showFavorites',
    },
    initialize: function(e) {
      if (VPNht.isInstalled()) {
        VPNht.isConnected().then(isConnected => {
          if (isConnected) {
              .removeClass('vpn-disconnected')
          }
        });
      }
      App.vent.on('vpn:connected', function() {
      });
      App.vent.on('vpn:disconnected', function() {
      });
    },
    onAttach: function() {
      var activetab;
      if (AdvSettings.get('startScreen') === 'Last Open') {
        activetab = AdvSettings.get('lastTab');
      } else {
        activetab = AdvSettings.get('startScreen');
      }
      if (typeof App.currentview === 'undefined') {
        switch (activetab) {
            App.currentview = 'shows';
            App.currentview = 'movies';
            App.currentview = 'anime';
            App.currentview = 'Favorites';
            App.previousview = 'movies';
            App.currentview = 'Watchlist';
            App.previousview = 'movies';
            App.currentview = 'Torrent-collection';
            App.previousview = 'movies';
            App.currentview = 'Seedbox';
            App.previousview = 'movies';
            App.currentview = 'movies';
        }
      }
    },
    sortBy: function(e) {
      this.model.set({
      });
    },
    changeType: function(e) {
      App.vent.trigger('about:close');

    },
    showTorrentCollection: function(e) {
      if (App.currentview !== 'Torrent-collection') {
        App.previousview = App.currentview;
        App.currentview = 'Torrent-collection';
      } else {
        App.currentview = App.previousview;
      }
    },
    showSeedbox: function(e) {
      if (App.currentview !== 'Seedbox') {
        App.previousview = App.currentview;
        App.currentview = 'Seedbox';
      } else {
        App.currentview = App.previousview;
      }
    },
    tvshowTabShow: function(e) {
      App.currentview = 'shows';
    },
    animeTabShow: function(e) {
      App.currentview = 'anime';
    },
    movieTabShow: function(e) {
      App.currentview = 'movies';
    },
    showFavorites: function(e) {

      if (App.currentview !== 'Favorites') {
        App.previousview = App.currentview;
        App.currentview = 'Favorites';
      } else {
        ) {
          App.currentview = App.previousview;
          this.setactive(App.currentview);
        } else {
      }
    },
  });
})(window.App);
