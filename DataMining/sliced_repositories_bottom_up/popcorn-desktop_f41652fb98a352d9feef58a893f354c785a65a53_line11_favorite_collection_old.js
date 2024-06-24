(function(App) {
    var FavoriteCollection = Backbone.Collection.extend({
        initialize: function(models, options) {
            this.providers = {
                torrent: new (App.Providers.Favorites)()
            };
        },
    });
})(window.App);
