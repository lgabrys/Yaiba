(function (App) {
    var MovieBrowser = App.View.PCTBrowser.extend({
        collectionModel: App.Model.MovieCollection,
        providerType: 'movie',
    });
})(window.App);
