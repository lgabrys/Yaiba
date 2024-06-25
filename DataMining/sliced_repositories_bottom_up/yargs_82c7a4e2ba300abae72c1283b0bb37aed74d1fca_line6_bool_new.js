var argv = require('yargs').argv;
if (argv.s) {
    console.log(argv.fr ? 'Le chat dit: ' : 'The cat says: ');
}
