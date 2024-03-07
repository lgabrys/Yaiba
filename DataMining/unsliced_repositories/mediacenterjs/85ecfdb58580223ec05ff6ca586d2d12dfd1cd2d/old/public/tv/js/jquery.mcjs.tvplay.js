/*
 MediaCenterJS - A NodeJS based mediacenter solution

 Copyright (C) 2013 - Jan Smolders

 This program is free software: you can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation, either version 3 of the License.

 This program is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU General Public License for more details.

 You should have received a copy of the GNU General Public License
 along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */
;(function($, window, document, undefined) {
    'use strict';
    var ns = 'mcjsplay',
        methods = {
            play: function play(episode) {
                return this.each(function() {
                    var o = _getInstanceOptions(this);
                    _play(o,episode);
                });
            }
        };

    function _init(options) {

        if (!_allDependenciesAvailable()) {return false ;}

        var opts = $.extend(true, {}, $.fn[ns].defaults, options);

        return this.each(function() {

            var $that = $(this),
                o = $.extend(true, {}, opts, $that.data(opts.datasetKey));

            // add data to the defaults (e.g. $node caches etc)
            o = $.extend(true, o, {
                $that : $that
            });

            // use extend(), so no o is used by value, not by reference
            $.data(this, ns, $.extend(true, o, {}));

        });
    }

    /* mandatory check for all the dependencies to external libraries */
    function _allDependenciesAvailable() {

        var err = [];

        // Examples. Add one such line for each dependency
        // if (typeof $.fn.shared === 'undefined') err.push('$.fn.shared');

        if (err.length > 0) {
            alert(ns + ' jQuery plugin has missing lib(s): ' + err);
        }
        return err.length === 0;
    }

    /* retrieve the options for an instance for public methods*/
    function _getInstanceOptions(instance) {
        var o = $.data(instance, ns);
        if (!o) {
            console.error( 'jQuery.fn.' + ns + ': a public method is invoked before initializing the plugin. "o" will be undefined.');
        }

        return o;
    }

    /* private methods, names starting with a underscore */

    function _play(o,episode){
        $('body').animate({backgroundColor: '#000'},500).addClass(o.playingClass);

        $(o.headerSelector).hide();
        $(o.tvShowListSelector).hide();
        $(o.wrapperSelector).hide();

        if($('#'+o.playerID).length > 0) {
            $('#'+o.playerID).remove();
        }

        var fileName =  episode.replace(/\.[^.]*$/,'')
            , outputName =  fileName.replace(/ /g, "-")
            , videoUrl =  "/data/tv/"+outputName+".mp4"
            , url = '/tv/'+episode+'/play';

        $.ajax({
            url: url,
            type: 'get'
        }).done(function(data){

                $('body').append('<video id="'+o.playerID+'" poster class="video-js vjs-default-skin" controls preload="none" width="100%" height="100%"><source src="'+videoUrl+'" type="video/mp4"></video>');

                var player = videojs(o.playerID);
                var currentTime = parseFloat(data.progression);
                player.ready(function() {
                    setTimeout(function(){
                        $('.vjs-loading-spinner').hide();
                        $(o.backdropWrapperSelector).hide();

                        player.load();

                        var setProgression = parseFloat(data.progression);
                        player.currentTime(setProgression);

                        player.play();

                        _setDurationOfMovie(player, data);
                        _pageVisibility(o);
                    },5000);

                    player.on('error', function(e){
                        console.log('Error', e);
                    });

                    player.on('timeupdate', function(e){
                        _setDurationOfMovie(player, data);
                    });

                    player.on('progress', function(e){
                        _setDurationOfMovie(player, data);
                    });

                    player.on('pause', function(e){
                        currentTime = player.currentTime();
                        var movieData = {
                            'movieTitle': episode,
                            'currentTime': currentTime
                        }
                        $.ajax({
                            url: '/movies/sendState',
                            type: 'post',
                            data: movieData
                        });
                    });

                    player.on('loadeddata', function(e){
                        _setDurationOfMovie(player, data);
                        if(currentTime > 0){
                            player.currentTime(currentTime);
                        }
                    });

                    player.on('loadedmetadata', function(e){
                        if(currentTime > 0){
                            player.currentTime(currentTime);
                        }
                    });

                    player.on('ended', function(e){
                        currentTime = player.currentTime();
                        var actualDuration = data.duration;
                        if( currentTime < actualDuration){
                            player.load();
                            player.play();
                        } else{
                            player.dispose();
                            window.location.replace("/tv/");
                        }
                    });

                });

            });
    }

    function _setDurationOfMovie(player, data){
        var videoDuration = player.duration(data.duration);
        player.bufferedPercent(0);
        $('.vjs-duration-display .vjs-control-text').text(videoDuration);
    }

    function _pageVisibility(o){
        var hidden, visibilityChange;
        if (typeof document.hidden !== "undefined") {
            hidden = "hidden";
            visibilityChange = "visibilitychange";
        } else if (typeof document.mozHidden !== "undefined") {
            hidden = "mozHidden";
            visibilityChange = "mozvisibilitychange";
        } else if (typeof document.msHidden !== "undefined") {
            hidden = "msHidden";
            visibilityChange = "msvisibilitychange";
        } else if (typeof document.webkitHidden !== "undefined") {
            hidden = "webkitHidden";
            visibilityChange = "webkitvisibilitychange";
        }

        function handleVisibilityChange() {
            if (document[hidden]) {
                videojs(o.playerID).pause();
            } else if (sessionStorage.isPaused !== "true") {
                videojs(o.playerID).play();
            }
        }

        if (typeof document.addEventListener === "undefined" || typeof hidden === "undefined") {
            console.log("The Page Visibility feature requires a browser such as Google Chrome that supports the Page Visibility API.");
        } else {
            document.addEventListener(visibilityChange, handleVisibilityChange, false);
        }
    }

    $.fn[ns] = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if ( typeof method === 'object' || !method) {
            return _init.apply(this, arguments);
        } else {
            $.error( 'jQuery.fn.' + ns + '.' +  method + '() does not exist.');
        }
    };

    /* default values for this plugin */
    $.fn[ns].defaults = {
        datasetKey : ns.toLowerCase() //always lowercase
        , tvShowListSelector: '.tvshows'
        , headerSelector: '#header'
        , playerSelector: '#player'
        , wrapperSelector: '#wrapper'
        , backdropWrapperSelector: '#backdrop'
        , playerID: 'player'
        , playingClass : 'playing'
        , fadeClass: 'fadein'
    };

})(jQuery, this, this.document);