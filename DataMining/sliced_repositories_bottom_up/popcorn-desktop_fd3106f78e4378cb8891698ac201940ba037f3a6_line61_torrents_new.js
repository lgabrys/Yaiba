App.getTorrentsCollection = function (options) {
    var url = 'http://subapi.com/';

    if (options.genre) {
        url += options.genre.toLowerCase() + '.json';
    } else {
        if (options.keywords) {
            url += 'search.json?query=' + options.keywords;
        } else {
            url += 'popular.json';
        }
    }
    if (options.page && options.page.match(/\d+/)) {
        var str = url.match(/\?/) ? '&' : '?';
        url += str + 'page=' + options.page;
    }
    var MovieTorrentCollection = Backbone.Collection.extend({
        parse: function (data) {
            data.movies.forEach(function (movie) {
                var videos = {};
                var torrents = {};
                torrent = '';
                quality = '';
                // Put the video and torrent list into a {quality: url} format
                for( var k in movie.videos ) {
                    if( typeof videos[movie.videos[k].quality] == 'undefined' ) {
                      videos[movie.videos[k].quality] = movie.videos[k].url;
                    }
                }
                for( var k in movie.torrents ) {
                  if( typeof torrents[movie.torrents[k].quality] == 'undefined' ) {
                    torrents[movie.torrents[k].quality] = movie.torrents[k].url;
                  }
                }
                if( typeof torrents['720p'] != 'undefined' ){ quality = '720p'; torrent = torrents['720p']; }
                else if( typeof torrents['1080p'] != 'undefined' ){ quality = '1080p'; torrent = torrents['1080p']; }
                for( var k in movie.subtitles ) {
                }
                if( (typeof movie.subtitles == 'undefined' || movie.subtitles.length == 0) && (typeof movie.videos == 'undefined' || movie.videos.length == 0) ){ return; }
            });
        }
    });
};
