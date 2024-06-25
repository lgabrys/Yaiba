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
    rightclick_search: function(e) {
      e.stopPropagation();
    },
  });
})(window.App);
