(function (App){
    App.View.PlayControl = Marionette.View.extend({
        initialize: function () {
            var subtitleProvider = App.Config.getProviderForType('subtitle');

        },
        onAttach: function () {
            this.loadComponents();
        },
        setQuality: function () {
            var quality = Settings.movies_default_quality;
            ['1080p', '720p', '480p', 'HDRip'].forEach(function (q) {
                if (torrents[q] !== undefined) {
                    quality = q;
                }
            });
        },
        hideUnused: function() {
            if (!this.model.get('trailer')) {
            }
        },
        loadDropdown: function (type, attrs) {
            this.views[type] && this.views[type].destroy();
            this.views[type] = new App.View.LangDropdown({
            });
        },

        switchAudio: function (lang) {
        },

        startStreaming: function () {
        },
        onBeforeDestroy: function () {
        }
    });
})(window.App);
