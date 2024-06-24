App.Controller.Home = function (page) {
    if (!App.Page.Home) {
        App.Page.Home = new App.View.Page({
        });
    }

    var Scrapper = App.currentScrapper;
    var movieCollection = new Scrapper([], {
        searchTerm: null,
    });
};
