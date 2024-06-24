(function (App) {
    var MovieBrowser = App.View.PCTBrowser.extend({
        collectionModel: App.Model.MovieCollection,
        provider: 'MovieApi',
    });
})(window.App);
