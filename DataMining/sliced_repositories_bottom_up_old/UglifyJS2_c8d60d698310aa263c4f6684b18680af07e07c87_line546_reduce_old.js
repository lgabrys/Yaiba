var U = require("./node");
function producesDifferentResultWhenMinified(result_cache, code, minify_options, max_timeout) {
    var minified = U.minify(code, minify_options);
    if (minified.error) return minified;
    var toplevel = minify_options.toplevel;
}
