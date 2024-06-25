var slice = [].slice;
function EventEmitter() {
};
EventEmitter.prototype.on = function(event, fn){
};
EventEmitter.prototype.emit = function(event){
  var args = slice.call(arguments, 1)
    , callbacks = this.callbacks[event];
  if (callbacks) {
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }
};
