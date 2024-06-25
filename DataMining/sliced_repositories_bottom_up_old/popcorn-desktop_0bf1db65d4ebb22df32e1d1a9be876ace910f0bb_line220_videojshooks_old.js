vjs.options['defaultVolume'] = 1;
vjs.options['children'] = {
};
vjs.Player.prototype.debugMouse_ = false;
vjs.Player.prototype.reportUserActivity = function(event){
};
vjs.Player.prototype.listenForUserActivity = function(){
  var onActivity, onMouseDown, mouseInProgress, onMouseUp,
      activityCheck, inactivityTimeout;
  onActivity = vjs.bind(this, this.reportUserActivity);
  onMouseDown = function(e) {
    mouseInProgress = setInterval(onActivity, 250);
  };
  onMouseUp = function(e) {
  };
  activityCheck = setInterval(vjs.bind(this, function() {
    if (this.userActivity_) {
      inactivityTimeout = setTimeout(vjs.bind(this, function() {
      }), 2000);
    }
  }), 250);
};
vjs.Player.prototype.onLoadStart = function() {
  vjs.addClass(this.el_, 'vjs-has-started');
};
