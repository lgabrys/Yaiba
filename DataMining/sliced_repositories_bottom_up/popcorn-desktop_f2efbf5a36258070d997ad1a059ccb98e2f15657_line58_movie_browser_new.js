(function(App) {
    var MovieBrowser = Backbone.Marionette.Layout.extend({
        onShow: function() {

        },
        onFilterChange: function() {
            this.movieCollection.fetch();
            App.vent.trigger('movie:closeDetail');
        },
    });
})(window.App);
