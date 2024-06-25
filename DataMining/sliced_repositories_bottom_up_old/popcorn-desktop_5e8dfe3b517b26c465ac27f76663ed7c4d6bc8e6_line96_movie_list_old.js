(function(App) {
    var _this;
    var MovieList = Backbone.Marionette.CompositeView.extend({

        ui: {
        },
        initialize: function() {
            _this = this;
            Mousetrap.bind('left', _this.moveLeft);
            Mousetrap.bind(['enter', 'space'], _this.selectItem);
        },

        onLoaded: function() {
            if(this.collection.hasMore && this.collection.filter.keywords === null && this.collection.state !== 'error') {
            }
        },
    });
})(window.App);
