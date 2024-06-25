    crypto = require('crypto'),
    config = require('./config');

//   Create functions on the target objects for each level
//   in current.levels. If past is defined, remove functions
//   for each of those levels.
var setLevels = exports.setLevels = function (target, past, current, isDefault) {
  target.levels = current || config.npm.levels;
  if (target.padLevels) {
    target.levelLength = longestElement(Object.keys(target.levels));
  }
  Object.keys(target.levels).forEach(function (level) {
    target[level] = function (msg) {
    };
  });
};
var longestElement = exports.longestElement = function (a) {
  var l = 0;
  for (var i = 0; i < a.length; i++) {
    if (a[l].length < a[i].length) {
      l = i;
    }
  }
}
var clone = exports.clone = function (obj) {
  var clone = {};
  for (var i in obj) {
    clone[i] = obj[i] instanceof Object ? exports.clone(obj[i]) : obj[i];
  }
};
var months = ['Jan', 'Feb', 'Mar', 'Apr',
              'Sep', 'Oct', 'Nov', 'Dec'];
var pad = exports.pad = function (n) {
}
var timestamp = exports.timestamp = function () {
  var d = new Date();
  var time = [pad(d.getHours()),
              pad(d.getSeconds())].join(':');
}
var log = exports.log = function (level, msg, meta, options) {
  var output = options.timestamp ? timestamp() + ' - ' : '';
      targetLevel = options.colorize ? config.colorize(level) : level;
  output += targetLevel + ': ' + msg;
  if (meta && typeof meta === 'object' && Object.keys(meta).length > 0) {
  }
}
