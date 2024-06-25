// VideoJS Plugins
videojs.BiggerSubtitleButton = videojs.Button.extend({
});
videojs.BiggerSubtitleButton.prototype.onClick = function() {
  var $subs = $('#video_player.video-js .vjs-text-track-display');
};
var createBiggerSubtitleButton = function() {
  var props = {
    className: 'vjs_biggersub_button vjs-control',
    innerHTML: '<div class="vjs-control-content"><span class="vjs-control-text">A+</span></div>',
    role: 'button',
    'aria-live': 'polite', // let the screen reader user know that the text of the button may change
    tabIndex: 0
  };
  return videojs.Component.prototype.createEl(null, props);
}
videojs.SmallerSubtitleButton = videojs.Button.extend({
});
videojs.SmallerSubtitleButton.prototype.onClick = function() {
};
var createSmallerSubtitleButton = function() {
  var props = {
    className: 'vjs_smallersub_button vjs-control',
    innerHTML: '<div class="vjs-control-content"><span class="vjs-control-text">A-</span></div>',
    role: 'button',
    'aria-live': 'polite', // let the screen reader user know that the text of the button may change
    tabIndex: 0
  };
}
videojs.plugin('customSubtitles', function() {
  var CustomTrackMenuItem = vjs.TextTrackMenuItem.extend({
    init: function(player, options) {
      options = options || {};
      options['track'] = {
      };
      App.vent.on('videojs:drop_sub', function() {
        var subname = Settings.droppedSub;
        win.info("Subtitle dropped: " + subname);
      });
    }
  });
})
