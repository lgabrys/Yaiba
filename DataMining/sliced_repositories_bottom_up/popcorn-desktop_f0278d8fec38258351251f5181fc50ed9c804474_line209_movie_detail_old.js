(function (App) {
    App.View.MovieDetail = Backbone.Marionette.ItemView.extend({
        events: {
            'click .playerchoicemenu li a': 'selectPlayer',
        },
        initialize: function () {
            //If a child was added above this view
        },
        onShow: function () {
            this.handleAnime();
            App.MovieDetailView = this;
        },
        startStreaming: function () {
            var torrent = this.model.get('torrents')[this.model.get('quality')]
        },
    });
})(window.App);
