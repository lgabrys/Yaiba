(function (App){
    App.View.QualitySelector = Marionette.View.extend({
        initialize: function () {
            var required = this.model.get('required');
            var torrents = this.model.get('torrents');
            let keys = Object.keys(torrents).sort(this.collator.compare);
            for (let key of required) {
            }
            for (let key of keys) {
                if (key === 0) {
                }
            }
        },
    });
})(window.App);
