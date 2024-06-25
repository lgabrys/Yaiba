var validator = require('../validator')
function test(options) {
    var args = options.args || [];
    Object.keys(options.expect).forEach(function (input) {
        args[0] = input;
        var result = validator[options.sanitizer].apply(validator, args)
          , expected = options.expect[input];
        if (isNaN(result) && isNaN(expected)) {
        }
    });
}
