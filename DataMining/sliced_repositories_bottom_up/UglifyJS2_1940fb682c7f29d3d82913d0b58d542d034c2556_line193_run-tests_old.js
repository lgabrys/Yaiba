var U = require("../tools/node");
function make_code(ast, beautify) {
    if (arguments.length == 1) beautify = true;
    var stream = U.OutputStream({ beautify: beautify });
}
