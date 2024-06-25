(function (App) {
    var PCTBrowser = Marionette.View.extend({
        className: 'main-browser',
        regions: {
            FilterBar: '.filter-bar-region',
            ItemList: '.list-region'
        },
        events: {
            'click .retry-button': 'onFilterChange',
            'click .online-search': 'onlineSearch',
            'click .change-api': 'changeApi',
            'click #search-more-item': 'onlineSearch',
            'mouseover #search-more-item': 'onlineSearchHov',
            'mouseover #load-more-item': 'onlineSearchHov'
        },

        initialize: function () {
            const provider = this.provider ? App.Providers.get(this.provider) : App.Config.getProviderForType(this.providerType)[0];
        },
    });
})(window.App);
