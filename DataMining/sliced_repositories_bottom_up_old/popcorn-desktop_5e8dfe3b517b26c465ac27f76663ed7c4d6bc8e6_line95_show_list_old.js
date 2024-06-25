(function(App) {
    var ShowList = Backbone.Marionette.CompositeView.extend({

        ui: {
        },
        initialize: function() {


        },

        onLoaded: function() {
            if(this.collection.hasMore && this.collection.filter.keywords === null && this.collection.state !== 'error') {
            }
        },
    });
})(window.App);
