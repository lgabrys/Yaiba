var Packets      = require('../packets');
function Query(options, callback) {
  this.nestTables = options.nestTables || false;
}
