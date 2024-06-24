(function (App) {
    var _this;
    var ErrorView = Marionette.View.extend({
        ui: {
        },
        onBeforeRender: function () {
            this.model.set('error', this.error);
        },
        onRender: function () {
            if (this.retry) {
                switch (App.currentview) {
                }
            }
        }
    });
    var List = Backbone.Marionette.CompositeView.extend({
        childViewContainer: '.items',
        events: {
        },
        initialize: function () {
            _this = this;
            App.vent.on('shortcuts:list', _this.initKeyboardShortcuts);
        },
    });
})(window.App);
