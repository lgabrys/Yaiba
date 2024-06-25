(function (App) {
    var Filter = Backbone.Model.extend({
        initialize: function () {
            this.get('provider').filters().then((filters) => {
                this.set('ratings', filters.ratings || []);
            });
        },
    });
})(window.App);
