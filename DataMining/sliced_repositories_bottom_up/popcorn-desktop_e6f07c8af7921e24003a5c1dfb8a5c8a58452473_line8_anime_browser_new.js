(function (App) {
    var AnimeBrowser = App.View.PCTBrowser.extend({
        filters: {
            genres: App.Config.genres_anime,
            sorters: App.Config.sorters_anime,
        }
    });
})(window.App);
