(function(App) {
  App.View.FilterBar = Marionette.View.extend({
    events: {
      'click #filterbar-settings': 'settings',
      'click .tvshowTabShow': 'tvshowTabShow',
      'click .triggerUpdate': 'updateDB',
    },
    initialize: function(e) {
      if (VPNht.isInstalled()) {
        VPNht.isConnected().then(isConnected => {
        });
      }
      App.vent.on('vpn:disconnected', function() {
        $('#filterbar-vpn')
          .addClass('fa-unlock')
      });
    },
    onAttach: function() {
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
      } else {
        this.model.set({
        });
      }
    },

    changeRating: function(e) {
      const rating = $(e.target).attr('data-value');
      const ratingLabel = rating === 'All' ? rating : `${rating}+`;
    },
  });
})(window.App);
