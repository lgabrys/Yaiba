var noop = function () { };
var path = require('path');
const semver = require('semver');
var version = process.versions.node.split('.') || [null, null, null];

var utils = (module.exports = {
  semver: semver,
  satisfies: test => semver.satisfies(process.versions.node, test),
  version: {
    minor: parseInt(version[1] || 0, 10),
    patch: parseInt(version[2] || 0, 10),
  },
  clone: require('./clone'),
  merge: require('./merge'),
  bus: require('./bus'),
  isWindows: process.platform === 'win32',
  isMac: process.platform === 'darwin',
  isLinux: process.platform === 'linux',
  isRequired: (function () {
    var p = module.parent;
    while (p) {
      if (!p.filename) {
      }
    }
  })(),
});
