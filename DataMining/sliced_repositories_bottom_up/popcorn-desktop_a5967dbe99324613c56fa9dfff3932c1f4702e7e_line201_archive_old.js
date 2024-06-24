(function (App) {
    function extractRating(movie) {
    }
    function formatOMDbforButter(movie) {
        movie.Quality = '480p'; // XXX
        return {
            images: {
            },
        };
    }
    var queryOMDb = function (item) {
        var params = {
            t: item.title,
            r: 'json',
            tomatoes: true
        };
    };
})(window.App);
