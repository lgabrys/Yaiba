(function(App) {
    "use strict";

    var FilterBarMovie = Backbone.Marionette.ItemView.extend({
        template: '#filter-bar-movie-tpl',
        className: 'filter-bar',

        ui: {
            searchForm: '.search form',
            search: '.search input',

            sorterValue: '.sorters .value',
            genreValue: '.genres .value'
        },

        events: {
            'submit @ui.searchForm': 'search',
            'click .sorters .dropdown-menu a': 'sortBy',
            'click .genres .dropdown-menu a': 'changeGenre',
            'click .settings': 'settings',
            'click .showMovies': 'showMovies',
            'click .showShows': 'showShows'
        },

        onShow: function() {
            this.$('.sorters .dropdown-menu a:nth(0)').addClass('active');
            this.$('.genres .dropdown-menu a:nth(0)').addClass('active');
        },

        search: function(e) {
            e.preventDefault();
            this.model.set({
                keywords: this.ui.search.val(),
                genre: ''
            });
            this.ui.search.val('');
            this.ui.search.blur();
        },

        sortBy: function(e) {
            this.$('.sorters .active').removeClass('active');
            $(e.target).addClass('active');

            var sorter = $(e.target).attr('data-value');
            this.ui.sorterValue.text(i18n.__('sort-' + sorter));

            this.model.set({
                keyword: '',
                sorter: sorter
            });
        },

        changeGenre: function(e) {
            this.$('.genres .active').removeClass('active');
            $(e.target).addClass('active');

            var genre = $(e.target).attr('data-value');
            this.ui.genreValue.text(i18n.__('genre-' + genre));

            this.model.set({
                keyword: '',
                genre: genre
            });
        },

        settings: function(e) {
            App.vent.trigger('settings:show');
        },

        showShows: function(e) {
            e.preventDefault();
            App.vent.trigger('shows:list', []);
        },

        showMovies: function(e) {
            e.preventDefault();
            App.vent.trigger('movies:list', []);
        }
    });

    App.View.FilterBarMovie = FilterBarMovie;
})(window.App);