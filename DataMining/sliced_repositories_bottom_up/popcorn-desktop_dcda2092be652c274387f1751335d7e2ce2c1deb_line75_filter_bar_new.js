(function(App) {
    App.View.FilterBar = Backbone.Marionette.ItemView.extend({
        search: function(e) {
            this.model.set({
                keywords: this.ui.search.val(),
            });
        },
        sortBy: function(e) {
            var sorter = $(e.target).attr('data-value');
            else this.model.set('order', -1);
        },
        changeGenre: function(e) {
            var genre = $(e.target).attr('data-value');
            this.ui.genreValue.text(i18n.__(genre));
        },
    });
})(window.App);
