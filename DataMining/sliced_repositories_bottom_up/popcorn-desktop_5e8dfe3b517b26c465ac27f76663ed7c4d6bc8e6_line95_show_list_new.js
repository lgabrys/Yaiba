(function(App) {
    var ShowList = Backbone.Marionette.CompositeView.extend({

        ui: {
        },
        initialize: function() {


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
