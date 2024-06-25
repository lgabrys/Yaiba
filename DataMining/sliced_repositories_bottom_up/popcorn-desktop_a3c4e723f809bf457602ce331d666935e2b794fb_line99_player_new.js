(function(App) {
    var Player = Backbone.Marionette.ItemView.extend({
        closePlayer: function() {
            App.vent.trigger('player:close');
        },
        onShow: function() {
            var _this = this;
            // Double Click to toggle Fullscreen
            if(this.model.get('type') == 'video/youtube') {
            }
            $(document).on('keydown', function (e) {
              } else if ((e.keyCode == 102) || (e.keyCode == 70)) {
                _this.toggleFullscreen();
              }
            });
        },
    });
})(window.App);
