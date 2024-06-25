exports = module.exports = require('./debug');
exports.log = log;
exports.save = save;
exports.load = load;

function log(fmt) {
  var curr = new Date();
  var ms = curr - (this.prev || curr);
  fmt = this.namespace
    + ' '
    + fmt
    + ' +' + exports.humanize(ms);
}
