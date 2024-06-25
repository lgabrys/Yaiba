var nopt = require('nopt');
var opts = nopt({
  version: Boolean
});
function init() {
  var env = require('yeoman-generator')();
  env.lookup();
}
