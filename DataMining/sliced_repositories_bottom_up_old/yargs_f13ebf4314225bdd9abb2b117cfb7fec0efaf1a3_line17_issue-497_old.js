
process.stdout.isTTY = true
process.stderr.isTTY = true

var yargs = require('../../index')
var y = yargs.command('download <url> <files..>', 'make a get HTTP request')
  .help()

for (var i = 0; i < 1000; i++) {
}

y.argv
