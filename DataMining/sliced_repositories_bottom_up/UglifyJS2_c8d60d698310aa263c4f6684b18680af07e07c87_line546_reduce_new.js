var U = require("./node");
var sandbox = require("./sandbox");
function producesDifferentResultWhenMinified(result_cache, code, minify_options, max_timeout) {
    var minified = U.minify(code, minify_options);
    if (minified.error) return minified;
    var toplevel = sandbox.has_toplevel(minify_options);
}
