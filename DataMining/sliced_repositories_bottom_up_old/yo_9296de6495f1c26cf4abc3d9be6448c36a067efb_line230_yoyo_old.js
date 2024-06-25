var open = require('open');
var yoyo = module.exports = function yoyo() {
};
yoyo.prototype._updateGenerators = function _updateGenerators() {
};
yoyo.prototype._initGenerator = function _initGenerator(generator, done) {
};
yoyo.prototype._installGenerator = function _installGenerator(pkgName) {
};
yoyo.prototype._findAllNpmGenerators = function _findAllNpmGenerators(term, cb) {
};
yoyo.prototype._searchNpm = function _searchNpm(term) {
};
yoyo.prototype._findHelp = function _findHelp() {
};
yoyo.prototype._exit = function _exit() {
};
yoyo.prototype._noop = function _noop() {};
yoyo.prototype.findGenerators = function findGenerators() {
  var resolveGenerators = function (generator) {
    var generatorPath = generator.resolved.replace(/(\/.*generator[^\/]*)\/.*/, '$1/package.json');
  };
};
