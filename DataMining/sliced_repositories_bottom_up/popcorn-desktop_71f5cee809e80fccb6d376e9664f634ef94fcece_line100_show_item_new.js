(function(App) {
    var ShowItem = Backbone.Marionette.ItemView.extend({
        onShow: function() {

        },
        onRender: function() {
            this.ui.coverImage.on('load', _.bind(this.showCover, this));
        },

        toggleFavorite: function(e) {
            var that = this;
            if (this.model.get('bookmarked') === true) {
                Database.deleteBookmark(this.model.get('imdb_id'), function(err, data) {
                    App.userBookmarks.splice(App.userBookmarks.indexOf(that.model.get('imdb_id')), 1);
                });
            } else {
        }
    });
})(window.App);
