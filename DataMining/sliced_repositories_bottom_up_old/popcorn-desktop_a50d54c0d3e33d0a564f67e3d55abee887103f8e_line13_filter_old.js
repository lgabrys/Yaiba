App.Controller.FilterGenre = function (genre, page) {
    if (!App.Page.FilterGenre) {
        App.Page.FilterGenre = new App.View.Page({
        });
    }

    var Scrapper = App.currentScrapper;
    var movieCollection = new Scrapper([], {
        searchTerm: null,
    });
};
