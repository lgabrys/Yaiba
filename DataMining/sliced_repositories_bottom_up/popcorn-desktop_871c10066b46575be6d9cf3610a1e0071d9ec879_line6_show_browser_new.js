(function (App) {
    var ShowBrowser = App.View.PCTBrowser.extend({
        collectionModel: App.Model.ShowCollection,
        providerType: 'tvshow',
    });
})(window.App);
