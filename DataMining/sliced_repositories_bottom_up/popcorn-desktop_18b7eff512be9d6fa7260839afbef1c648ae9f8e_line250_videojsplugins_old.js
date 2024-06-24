videojs.BiggerSubtitleButton = videojs.Button.extend({
});
videojs.BiggerSubtitleButton.prototype.onClick = function() {
  var $subs = $('#video_player.video-js .vjs-text-track');
  var font_size = parseInt($subs.css('font-size'));
  font_size = font_size + 2;
};
var createBiggerSubtitleButton = function() {
  var props = {
    className: 'vjs_biggersub_button vjs-control',
    innerHTML: '<div class="vjs-control-content"><span class="vjs-control-text">A+</span></div>',
    role: 'button',
    'aria-live': 'polite', // let the screen reader user know that the text of the button may change
    tabIndex: 0
  };
}
videojs.SmallerSubtitleButton = videojs.Button.extend({
});
videojs.SmallerSubtitleButton.prototype.onClick = function() {
  var $subs = $('#video_player.video-js .vjs-text-track');
  var font_size = parseInt($subs.css('font-size'));
  font_size = font_size - 2;
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
var smallerSubtitle;
videojs.plugin('smallerSubtitle', function() {
  var options = { 'el' : createSmallerSubtitleButton() };
  smallerSubtitle = new videojs.SmallerSubtitleButton(this, options);
});
videojs.plugin('customSubtitles', function() {
  var subtitlesButton;
  this.controlBar.children().forEach(function(el) { if (el.name() == 'subtitlesButton') subtitlesButton = el; });
  var CustomTrackMenuItem = vjs.TextTrackMenuItem.extend({
  });
  CustomTrackMenuItem.prototype.onClick = function() {
    this.fileInput_.trigger('click'); // redirect to fileInput click
  }
  CustomTrackMenuItem.prototype.loadSubtitle = function(filePath) {
  }
})
videojs.plugin('progressTips', function(options) {
    var init;
    init = function() {
    };
  });
vjs.TextTrack.prototype.load = function(){
  if (this.readyState_ === 0) {
    function decode(dataBuff, language, callback) {
      var charsetDetect = require('jschardet');
      var charset = charsetDetect.detect(dataBuff);
      var detectedEncoding = charset.encoding;
      if (detectedEncoding == targetEncodingCharset || detectedEncoding == targetCharset) {
        callback(dataBuff.toString('utf-8'));

      // We do
      } else {
        if ( detectedEncoding == 'IBM855' || detectedEncoding == 'windows-1250' || detectedEncoding == 'windows-1251' || detectedEncoding == 'windows-1252' || detectedEncoding == 'windows-1255' || detectedEncoding == 'windows-1254' ) {
          // It's the charset detector screwing up again
          var langInfo = App.Localization.languages[language] || {}
        }
      }
    }
  }
};
