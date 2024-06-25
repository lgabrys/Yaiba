var rules = require('../rules');
function normaliseRules(options, ready) {
  // convert ignore and watch options to rules/regexp
  rules.watch.add(options.watch);
  options.watch = rules.rules.watch;
}
