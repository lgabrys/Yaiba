(function (App) {
    var ErrorView = Marionette.View.extend({
        ui: {
            retryButton: '.retry-button',
        },
        onBeforeRender: function () {
        },
        onRender: function () {
            if (this.retry) {
            }
        }
    });
    var List = Backbone.Marionette.CompositeView.extend({

        events: {
            'scroll': 'onScroll',
        },
        initialize: function () {
            App.vent.on('viewstack:pop', function() {
                if (_.last(App.ViewStack) === 'init-container') {
                }
            });
        },
    });
})(window.App);
