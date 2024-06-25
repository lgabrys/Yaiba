(function(App) {
    var _this;
    var MovieList = Backbone.Marionette.CompositeView.extend({

        ui: {
        },
        initialize: function() {
            _this = this;
            Mousetrap.bind('left', _this.moveLeft);
            Mousetrap.bind('right', _this.moveRight);
        },
        remove: function() {
            $(window).off('resize', this.onResize);
        },
        onLoaded: function() {
            if(this.collection.hasMore && this.collection.filter.keywords === undefined && this.collection.state !== 'error') {
            }
        },
    });
})(window.App);
