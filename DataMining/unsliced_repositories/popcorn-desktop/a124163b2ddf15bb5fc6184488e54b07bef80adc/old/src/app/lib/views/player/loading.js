(function(App) {
    'use strict';

    var Loading = Backbone.Marionette.ItemView.extend({
        template: '#loading-tpl',
        className: 'app-overlay',

        ui: {
            stateTextDownload: '.text_download',
            progressTextDownload: '.value_download',

            stateTextPeers: '.text_peers',
            progressTextPeers: '.value_peers',

            stateTextSeeds: '.text_seeds',
            progressTextSeeds: '.value_seeds',

            seedStatus: '.seed_status',
            downloadPercent: '.download_percent',

            downloadSpeed: '.download_speed',
            progressbar: '#loadingbar-contents',

            title: '.title',
            player: '.player-name',
            streaming: '.external-play',
            controls: '.player-controls',
            cancel_button: '.cancel-button'
        },

        events: {
            'click .cancel-button': 'cancelStreaming',
            'click .pause': 'pauseStreaming',
            'click .stop': 'stopStreaming',
            'click .play': 'resumeStreaming'
        },

        initialize: function() {
            var _this = this;

            //If a child was removed from above this view
            App.vent.on('viewstack:pop', function() {
                if(_.last(App.ViewStack) === _this.className){
                    _this.initKeyboardShortcuts();
                }
            });

            //If a child was added above this view
            App.vent.on('viewstack:push', function() {
                if(_.last(App.ViewStack) !== _this.className){
                    _this.unbindKeyboardShortcuts();
                }
            });

            win.info('Loading torrent');
            this.listenTo(this.model, 'change:state', this.onStateUpdate);
        },

        initKeyboardShortcuts: function(){
            var _this = this;
            Mousetrap.bind(['esc', 'backspace'], function(e) {
                _this.cancelStreaming();
            });
        },

        unbindKeyboardShortcuts: function(){
            Mousetrap.unbind(['esc', 'backspace']);
        },

        onShow: function() {
            $('.filter-bar').hide();
            $('#header').addClass('header-shadow');

            this.initKeyboardShortcuts();
        },
        onStateUpdate: function() {
            var state = this.model.get('state');
            win.info('Loading torrent:', state);

            this.ui.stateTextDownload.text(i18n.__(state));

            if (state === 'downloading') {
                this.listenTo(this.model.get('streamInfo'), 'change:downloaded', this.onProgressUpdate);
            }

            if(state === 'playingExternally') {
                this.ui.stateTextDownload.hide();
                this.ui.controls.show();
            }
        },

        onProgressUpdate: function() {

            // TODO: Translate peers / seeds in the template
            this.ui.seedStatus.show();
            var streamInfo = this.model.get('streamInfo');
            var downloaded = streamInfo.get('downloaded') / (1024 * 1024);
            this.ui.progressTextDownload.text(downloaded.toFixed(2) + ' Mb');

            this.ui.progressTextPeers.text(streamInfo.get('active_peers'));
            this.ui.progressTextSeeds.text(streamInfo.get('total_peers'));
            this.ui.downloadPercent.text(streamInfo.get('percent').toFixed() + '%');

            this.ui.downloadSpeed.text(streamInfo.get('downloadSpeed'));
            this.ui.progressbar.css('width', streamInfo.get('percent').toFixed() + '%');

            if(streamInfo.get('title') !== '') {
                this.ui.title.text(streamInfo.get('title'));
            }
            if(streamInfo.get('player') !== ''){
                this.ui.player.text(streamInfo.get('player'))
                this.ui.streaming.show();
                this.ui.cancel_button.hide();
            }
        },

        cancelStreaming: function() {
            App.vent.trigger('stream:stop');
            App.vent.trigger('player:close');
            $('.filter-bar').show();
            $('#header').removeClass('header-shadow');
            Mousetrap.bind('esc', function(e) {
                App.vent.trigger('show:closeDetail');
                App.vent.trigger('movie:closeDetail');
            });
        },

        pauseStreaming: function() {
            App.vent.trigger('device:pause');
            $('.pause').removeClass('fa-pause').removeClass('pause').addClass('fa-play').addClass('play');
        },

        resumeStreaming: function() {
            console.log('clicked play');
            App.vent.trigger('device:unpause');
            $('.play').removeClass('fa-play').removeClass('play').addClass('fa-pause').addClass('pause');
        },

        stopStreaming: function() {
            App.vent.trigger('device:stop');
            this.cancelStreaming();
        }
    });

    App.View.Loading = Loading;
})(window.App);