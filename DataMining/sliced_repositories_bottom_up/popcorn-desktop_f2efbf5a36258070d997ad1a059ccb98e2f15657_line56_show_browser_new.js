(function(App) {
    var ShowBrowser = Backbone.Marionette.Layout.extend({
        onShow: function() {
            this.FilterBar.show(this.bar);
        },
        onFilterChange: function() {
            App.vent.trigger('show:closeDetail');
        },
    });
})(window.App);
