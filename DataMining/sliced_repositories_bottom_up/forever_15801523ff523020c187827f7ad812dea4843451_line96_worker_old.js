    fs = require('fs'),
    path = require('path'),
    nssocket = require('nssocket'),
    utile = require('utile'),
    forever = require(path.resolve(__dirname, '..', 'forever'));
var Worker = exports.Worker = function (options) {
  options = options || {};
  this._socket = null;
};
Worker.prototype.start = function (callback) {
  var self = this,
      err;
  if (this._socket) {
    err = new Error("Can't start already started worker");
  }
  function workerProtocol(socket) {
    socket.data(['spawn'], function (data) {
      var monitor = new (forever.Monitor)(data.script, data.args);
      monitor.start();
    });
    socket.data(['stop'], function () {
      if (process.platform === 'win32') {
        fs.unlink(self._sockFile);
      }
    });
  }
};
