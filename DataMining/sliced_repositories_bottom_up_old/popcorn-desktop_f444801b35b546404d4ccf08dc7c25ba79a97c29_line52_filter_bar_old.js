(function(App) {
    var FilterBarShow = Backbone.Marionette.ItemView.extend({
        sortBy: function(e) {
            this.$('.sorters .active').removeClass('active');
            var sorter = $(e.target).attr('data-value');
            this.ui.sorterValue.text(i18n.__('sort-' + sorter));
        },
    });
})(window.App);
