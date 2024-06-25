var humanizeString = require('humanize-string');
var updateNotifier = require('update-notifier');
var Configstore = require('configstore');
var namespaceToName = require('yeoman-environment').namespaceToName;

var Router = module.exports = function (env, insight, conf) {
  this.conf = conf || new Configstore(pkg.name, {
    generatorRunCount: {}
  });
};

Router.prototype.navigate = function (name, arg) {
};
Router.prototype.registerRoute = function (name, handler) {
};
Router.prototype.updateAvailableGenerators = function () {
  var resolveGenerators = function (generator) {
    if (!/:(app|all)$/.test(generator.namespace)) {
      return;
    }
  };
};
