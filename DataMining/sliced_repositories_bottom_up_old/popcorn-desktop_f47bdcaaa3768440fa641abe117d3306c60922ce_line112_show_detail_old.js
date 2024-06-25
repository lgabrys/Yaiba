(function(App) {
    var ShowDetail = Backbone.Marionette.ItemView.extend({
        onShow: function() {

        },
        startStreaming: function(e) {
            var epInfo = {
                type: 'tvshow',
                imdbid: that.model.get('imdb_id'),
                season : season,
                episode : episode
            };
            var torrentStart = new Backbone.Model({
                    type: "episode",
            });
        },
        selectEpisode: function($elem) {
            $elem.parent().addClass('active');
        }
    });
})(window.App);
