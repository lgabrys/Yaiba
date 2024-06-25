(function(App) {
    App.View.FilterBar = Backbone.Marionette.ItemView.extend({
        sortBy: function(e) {
            this.model.set({
            });
        },
        changeGenre: function(e) {

        },
        settings: function(e) {
            App.vent.trigger('settings:show');
        },
    });
})(window.App);
