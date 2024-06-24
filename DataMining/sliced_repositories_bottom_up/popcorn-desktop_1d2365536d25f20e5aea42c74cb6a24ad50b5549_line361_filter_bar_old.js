(function(App) {
  App.View.FilterBar = Marionette.View.extend({
    events: {
      'click #filterbar-tempf': 'tempf',
      'click .animeTabShow': 'animeTabShow',
    },
    initialize: function(e) {
      if (VPNht.isInstalled()) {
        VPNht.isConnected().then(isConnected => {
          if (isConnected) {
              .addClass('fa-lock')
          }
        });
      }
      App.vent.on('vpn:connected', function() {
          .removeClass('fa-unlock');
      });

    },
    setActive: function(set) {
      var filterbarRandom = $('#filterbar-random');
      switch (set) {
          $('.source.tvshowTabShow').addClass('active');
        case 'movies':
      }
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
          case 'TV Series':
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
    fixFilter: function() {
      var sorter = $('.sorters .value').data('value');
      $('.sorters li')
        .find('[data-value="' + sorter + '"]')
    },
    search: function(e) {
      this.ui.searchInput.blur();
    },
    sortBy: function(e) {
      var sorter = $(e.target).attr('data-value');
      this.previousSort = sorter;
    },
    changeType: function(e) {
      App.vent.trigger('torrentCollection:close');
      var type = $(e.target).attr('data-value');
    },
    tempf: function (e) {
      nw.Shell.openExternal(Settings.tmpLocation);
    },
  });
})(window.App);
