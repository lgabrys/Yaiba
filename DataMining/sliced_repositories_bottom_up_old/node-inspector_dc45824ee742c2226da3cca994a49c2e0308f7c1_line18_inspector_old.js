    session = require('./session');
var options = {};
process.argv.forEach(function(arg) {
  if (arg.indexOf('--') > -1) {
    var parts = arg.split('=');
    if (parts.length > 1) {
      switch(parts[0]) {
          options.file = parts[1];
          options.file = parts[1];
          brk = true;
      }
    }
  }
});
