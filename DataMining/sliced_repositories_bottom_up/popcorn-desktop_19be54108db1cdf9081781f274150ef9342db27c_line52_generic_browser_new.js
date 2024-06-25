(function(App) {
    var PCTBrowser = Backbone.Marionette.Layout.extend({
        onShow: function() {
            this.ItemList.show(new App.View.List({
            }));
        },
        onFilterChange: function() {
            this.ItemList.show(new App.View.List({
            }));
        },
    });
})(window.App);
