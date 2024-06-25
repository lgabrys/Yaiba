(function(App) {
  'use strict';

  var Loading = Marionette.View.extend({
    ui: {
      stateTextFilename: '.text_filename',
      seedStatus: '.seed_status',
      streaming: '.external-play',
      cancel_button: '#cancel-button',
      playingbar: '#playingbar-contents',
      userCity: '#userCity',
    },
    events: {
      'click .backward': 'backwardStreaming',
    },
    initialize: function() {
      var that = this;
      App.vent.trigger('settings:close');
      $('.button:not(#download-torrent), .show-details .sdow-watchnow, .show-details #download-torrent, .file-item, .result-item, .collection-actions').addClass('disabled');
      // If a child was removed from above this view
    },
    showVPNLoader: function() {
      request(
        (err, _, data) => {
          } else {
          }
        }
      );
    },
    onAttach: function() {
      App.LoadingView = this;
      $('.minimize-icon,#maxic,.open-button,.title,.text_filename,.text_streamurl,.show-pcontrols').tooltip({
        delay: {
        }
      });
    },
    onStateUpdate: function() {
      var state = this.model.get('state');
      var streamInfo = this.model.get('streamInfo');
      if (state === 'playingExternally') {
        if (streamInfo && streamInfo.get('device')) {
        }
      }
    },
    onDeviceStatus: function(status) {
      if (this.extPlayerStatusUpdater && status.playerState === 'IDLE') {
        if (status.idleReason === 'ERROR') {
          win.debug('Status: ', status);
        }
      }
    },
  });
})(window.App);
