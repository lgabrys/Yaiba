(function(App) {
    var MovieDetail = Backbone.Marionette.ItemView.extend({
        onShow: function() {
            var torrents = this.model.get('torrents');
            if(torrents['720p'] !== undefined && torrents['1080p'] !== undefined) {
                var torrentUrl = torrents['1080p'].url;
            } else if(torrents['1080p'] !== undefined ) {
                var torrentUrl = torrents['1080p'].url;
            } else if(torrents['720p'] !== undefined ) {
                var torrentUrl = torrents['720p'].url;
            }
            var background = $(".movie-backdrop").attr("data-bgr");
            $('<img/>').attr('src', background).load(function() {
                $(".movie-backdrop").css('background-image', "url(" + background + ")");
            });
            Mousetrap.bind('esc', function(e) {
            });
        },
        playTrailer: function() {
            var trailer = new Backbone.Model({src: this.model.get('trailer'), type: 'video/youtube', subtitle: null, title: this.model.get('title') });
        },
    });
})(window.App);
