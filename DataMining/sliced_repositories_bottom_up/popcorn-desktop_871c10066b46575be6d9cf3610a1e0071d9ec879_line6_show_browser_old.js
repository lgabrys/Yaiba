(function (App) {
    var ShowBrowser = App.View.PCTBrowser.extend({
        collectionModel: App.Model.ShowCollection,
        provider: 'TVApi',
    });
})(window.App);
