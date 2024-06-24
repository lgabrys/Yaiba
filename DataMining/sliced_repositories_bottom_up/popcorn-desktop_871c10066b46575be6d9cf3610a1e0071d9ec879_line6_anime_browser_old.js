(function (App) {
    var AnimeBrowser = App.View.PCTBrowser.extend({
        collectionModel: App.Model.AnimeCollection,
        provider: 'AnimeApi',
    });
})(window.App);
