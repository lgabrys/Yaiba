(function (App) {
    'use strict';
    var sort = function (items, filters) {
        var sorted = [],
            matched;
        if (filters.sorter === 'title') {
            sorted = items.sort(function (a, b) {
                var A = a.title.toLowerCase();
                var B = b.title.toLowerCase();
                if (A < B) {
                    return -1 * filters.order;
                } else if (A > B) {
                    return 1 * filters.order;
                } else {
                    return 0;
                }
            });
        }
        if (filters.sorter === 'rating') {
            sorted = items.sort(function (a, b) {
                var a_rating = a.type === 'bookmarkedmovie' ? a.rating : (a.rating.percentage / 10);
                var b_rating = b.type === 'bookmarkedmovie' ? b.rating : (b.rating.percentage / 10);
                return filters.order === -1 ? b_rating - a_rating : a_rating - b_rating;
            });
        }
        if (filters.sorter === 'year') {
            sorted = items.sort(function (a, b) {
                return filters.order === -1 ? b.year - a.year : a.year - b.year;
            });
        }
        if (filters.sorter === 'watched items') {
            sorted = items.sort(function (a, b) {
                var a_watched = App[a.type === 'bookmarkedmovie' ? 'watchedMovies' : 'watchedShows'].indexOf(a.imdb_id) !== -1;
                var b_watched = App[b.type === 'bookmarkedmovie' ? 'watchedMovies' : 'watchedShows'].indexOf(b.imdb_id) !== -1;
                return filters.order === -1 ? a_watched - b_watched : b_watched - a_watched;
            });
        }

        if (filters.type !== 'All') {
            matched = [];
            if (filters.type === 'Anime') {
                sorted = matched;
            } else {
        }
        if (filters.keywords) {
            matched = [];
            sorted = matched;
        }
    };
    var formatForButter = function (items) {
        items.forEach(function (movie) {
            } else {
                Database.getTVShowByImdb(movie.imdb_id)
                    .then(function (data) {
                        data.type = 'bookmarkedshow';
                        data.imdb = data.imdb_id;
                        if (typeof (data.provider) === 'undefined' || data.provider === 'Eztv') {
                            data.provider = 'tvshow';
                        }
                        } else {
                            data.image = data.images.poster;
                        }
                    }).then(function (data) {
            }
        });
    };
})(window.App);
