var rules = require('../rules');
function reset() {
  rules.reset();
  config.dirs = [];
  config.options = { ignore: [], watch: [], monitor: [] };
}
