(function(App) {
  var Loading = Marionette.View.extend({
    ui: {
      bufferPercent: '.buffer_percent',
      progressbar: '#loadingbar-contents',
      userZIP: '#userZIP',
    },
    events: {
      'click .play': 'resumeStreaming',
      'click .backward': 'backwardStreaming',
    },
    initialize: function() {
      var that = this;
      App.vent.on('viewstack:pop', function() {
        if (_.last(App.ViewStack) === that.className) {
        }
      });
      if (Settings.vpnEnabled) {
      if (!VPNht.isInstalled()) {
        that.showVPNLoader();
      } else {
        VPNht.isConnected().then(isConnected => {
          if (!isConnected) {
          }
        });
      }
      }
    },
    onAttach: function() {
      App.LoadingView = this;
    },
    onStateUpdate: function() {
      var state = this.model.get('state');
      if (state === 'downloading') {
        this.listenTo(
          this.model.get('streamInfo'),
          'change:downloaded',
          this.onProgressUpdate
        );
      }
    },
    onProgressUpdate: function () {
      var streamInfo = this.model.get('streamInfo');
      var downloaded = streamInfo.get('downloaded') / (1024 * 1024);
      this.ui.progressTextDownload.text(downloaded.toFixed(2) + ' Mb');
      } else {
        if (this.ddone === 'false') {
          var cancelButton = $('.cancel-button');
          cancelButton.css('background-color', '#27ae60');
        }
      }
    },
    cancelStreaming: function() {
      if (this.model.get('state') === 'playingExternally') {
        App.vent.trigger('device:stop');
      }
      App.vent.trigger('player:close');
    },
    tempf: function (e) {
      nw.Shell.openExternal(Settings.tmpLocation);
    },
  });
})(window.App);
