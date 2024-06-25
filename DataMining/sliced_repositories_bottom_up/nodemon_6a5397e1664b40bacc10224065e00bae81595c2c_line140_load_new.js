var rules = require('../rules');
function normaliseRules(options, ready) {
  // convert ignore and watch options to rules/regexp
  rules.watch.add(options.watch);
  options.watch = options.watch === false ? false : rules.rules.watch;
}
