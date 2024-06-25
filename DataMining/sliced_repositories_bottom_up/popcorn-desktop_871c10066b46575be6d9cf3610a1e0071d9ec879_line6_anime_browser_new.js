(function (App) {
    var AnimeBrowser = App.View.PCTBrowser.extend({
        collectionModel: App.Model.AnimeCollection,
        providerType: 'anime',
    });
})(window.App);
