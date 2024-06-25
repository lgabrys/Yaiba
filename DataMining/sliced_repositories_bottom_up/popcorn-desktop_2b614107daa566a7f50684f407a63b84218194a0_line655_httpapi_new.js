(function (App) {
    var rpc = require('json-rpc2');
    var server;
    var nativeWindow = require('nw.gui').Window.get();
    var Q = require('q');
    var initServer = function () {
        return Q.Promise(function (resolve, reject) {
            server = rpc.Server({
            });
            server.expose('listennotifications', function (args, opt, callback) {
                var emitEvents = function () {
                };


                App.vent.on('fullscreenchange', function () {
                });
            });
            server.expose('togglefavourite', function (args, opt, callback) {
                popcornCallback(callback);
            });
            server.expose('movieslist', function (args, opt, callback) {
            });
            server.expose('getfullscreen', function (args, opt, callback) {
                nativeWindow = require('nw.gui').Window.get();
            });
            server.expose('setplayer', function (args, opt, callback) {
                if (args.length > 0) {
                    if (el.length > 0) {
                    } else {
                        App.Device.Collection.models.forEach(function (item) {
                        });
                    }
                } else {
                }
            });
            server.expose('setsubtitle', function (args, opt, callback) {
                var lang = args[0];
                if (App.ViewStack[App.ViewStack.length - 1] === 'player') {
                    } else {
                        var tracks = App.PlayerView.player.textTracks();
                        for (var trackIndex = 0; trackIndex < tracks.length; trackIndex++) {
                            var track = tracks[trackIndex];
                            if (track.language() === lang) {
                            }
                        }
                    }
                }
                popcornCallback(callback);
            });
            server.expose('getplaying', function (args, opt, callback) {
                var view = App.PlayerView;
                if (view !== undefined && !view.isDestroyed) {
                    var result = {
                        playing: !view.player.paused(),
                        title: view.model.get('title'),
                        movie: view.isMovie(),
                        quality: view.model.get('quality'),
                        downloadSpeed: view.model.get('downloadSpeed'),
                        uploadSpeed: view.model.get('uploadSpeed'),
                        activePeers: view.model.get('activePeers'),
                        volume: view.player.volume(),
                        currentTime: App.PlayerView.player.currentTime(),
                        duration: App.PlayerView.player.duration(),
                        streamUrl: $('#video_player video') === undefined ? '' : $('#video_player video').attr('src'),
                        selectedSubtitle: '',
                        isFullscreen: nativeWindow.isFullscreen
                    };
                    if (result.movie && result.movie !== undefined) {
                        result['imdb_id'] = view.model.get('imdb_id');
                    } else if (result.movie === undefined) {
                } else {
            });
        });
    };
})(window.App);
