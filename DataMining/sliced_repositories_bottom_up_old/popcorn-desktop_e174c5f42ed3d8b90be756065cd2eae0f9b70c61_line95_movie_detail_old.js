(function(App) {
    var MovieDetail = Backbone.Marionette.ItemView.extend({
        onShow: function() {
            var torrents = this.model.get('torrents');
            else if(torrents['1080p'] !== undefined ) {
            }   else if(torrents['720p'] !== undefined ) {
            }
            $('<img/>').attr('src', background).load(function() {
             $(this).remove();
             });
        },
        onClose: function() {},
        playTrailer: function() {
            var trailer = new Backbone.Model({src: this.model.get('trailer'), type: 'video/youtube', subtitle: null });
        },
    });
})(window.App);
