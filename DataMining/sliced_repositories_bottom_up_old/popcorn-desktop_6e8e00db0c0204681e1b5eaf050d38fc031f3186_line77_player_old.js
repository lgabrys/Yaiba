(function(App) {

    var Player = Backbone.Marionette.ItemView.extend({
        ui: {
            uploadSpeed: '.upload_speed_player',
        },
        updateActivePeers: function() {
            this.ui.activePeers.text(this.model.get('active_peers'));
        },
        closePlayer: function() {
            if(this.video.currentTime() / this.video.duration() >= 0.8){
                if(this.model.get('show_id') != null) {
                    console.log("Mark TV Show watched");
                } else if (this.model.get('movie_id') != null) {
            }
        },

        onShow: function() {
            // Test to make sure we have title
            var _this = this;
            $('#video_player').dblclick(function(event){
            });
            if(this.model.get('type') == 'video/youtube') {
                this.video = videojs('video_player', { techOrder: ["youtube"], forceSSL: true, ytcontrols: false, quality: '720p' });
            }
                this.video = videojs('video_player', { plugins: { biggerSubtitle : {}, smallerSubtitle : {}, customSubtitles: {}, progressTips: {} }});
        },
    });
})(window.App);
