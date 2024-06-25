(function(App) {
    var FavoriteCollection = Backbone.Collection.extend({
        initialize: function(models, options) {
            this.providers = {
                torrent: App.Providers.get('Favorites')
            };
        },
    });
})(window.App);
