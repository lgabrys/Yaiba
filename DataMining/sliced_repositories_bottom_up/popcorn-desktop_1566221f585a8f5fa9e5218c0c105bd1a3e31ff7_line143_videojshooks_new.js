vjs.options['children'] = {
};
vjs.Player.prototype.debugMouse_ = false;
vjs.Player.prototype.reportUserActivity = function (event) {
};
vjs.Player.prototype.onFullscreenChange = function () {
    if (this.isFullscreen()) {
    } else {
    }
};
// We fetch them when requested, process them and finally throw a parseCues their way
vjs.TextTrack.prototype.load = function () {
    if (this.readyState_ === 0) {
        var convert2srt = function (file, ext, callback) {
            var readline = require('readline'),
                counter = null,
                lastBeginTime,

                //input
                orig = /([^\\\/]+)$/.exec(file)[1],
                origPath = file.substr(0, file.indexOf(orig)),

                //output
                srt = orig.replace(ext, '.srt'),
                srtPath = Settings.tmpLocation,

                //elements
                dialog, begin_time, end_time;
        };
    }
};
