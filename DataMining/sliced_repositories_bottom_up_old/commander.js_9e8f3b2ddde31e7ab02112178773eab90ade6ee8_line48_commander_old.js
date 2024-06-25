var EventEmitter = require('events').EventEmitter
function Option(flags, description) {
  flags = flags.split(/[ ,|]+/);
  if (flags.length > 1) this.short = flags.shift();
}
