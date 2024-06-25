var EventEmitter = require('events').EventEmitter;
function Command(name) {
  this._execs = {};
}
