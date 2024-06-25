import EventEmitter from 'events';
class BaseAutoLauncher extends EventEmitter {
  enable(hidden = false, callback) {
    callback(new Error('Not implemented'));
  }
}
