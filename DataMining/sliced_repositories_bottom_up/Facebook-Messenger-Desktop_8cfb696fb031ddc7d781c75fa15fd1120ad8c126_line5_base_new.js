import EventEmitter from 'events';
class BaseAutoLauncher extends EventEmitter {
  enable(callback) {
    callback(new Error('Not implemented'));
  }
}
