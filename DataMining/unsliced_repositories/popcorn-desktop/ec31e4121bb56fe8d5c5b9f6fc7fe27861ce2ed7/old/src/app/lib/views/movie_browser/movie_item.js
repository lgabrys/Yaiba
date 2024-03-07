(function(App) {
    "use strict";

    var MovieItem = Backbone.Marionette.ItemView.extend({
        template: '#movie-item-tpl',

        tagName: 'li',

        ui: {
            cover: '.cover img'
        },

        onShow: function() {
            this.ui.cover.on('load', _.bind(this.showCover, this));
        },

        onClose: function() {
            this.ui.cover.off('load');
        },

        showCover: function() {
            this.ui.cover.removeClass('hidden');
        }
    });

    App.View.MovieItem = MovieItem;
})(window.App);