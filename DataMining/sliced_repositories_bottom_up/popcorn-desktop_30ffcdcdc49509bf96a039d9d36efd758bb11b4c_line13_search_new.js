App.Controller.Search = function (searchTerm, page) {
    if (App.Page.Search) {
        App.Page.Search = new App.View.Page({
            id: 'movie-list'
        });
    }

    var Scrapper = App.currentScrapper;
    var movieCollection = new Scrapper([], {
        keywords: searchTerm,
    });
};
