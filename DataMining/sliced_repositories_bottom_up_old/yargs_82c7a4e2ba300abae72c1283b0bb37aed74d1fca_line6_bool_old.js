var util = require('util');
var argv = require('yargs').argv;
if (argv.s) {
    util.print(argv.fr ? 'Le chat dit: ' : 'The cat says: ');
}
