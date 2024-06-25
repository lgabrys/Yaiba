(function(App) {
    var Loading = Backbone.Marionette.ItemView.extend({
        initialize: function() {

            App.vent.on('viewstack:push', function() {
                if(_.last(App.ViewStack) !== _this.className){
                }
            });

        },
        onProgressUpdate: function() {
            var streamInfo = this.model.get('streamInfo');
            if(streamInfo.get('player') !== ''){
                this.ui.player.text(streamInfo.get('player'))
            }
        },
    });
})(window.App);
