var fs = require("fs");

exports.FILES = [
    require.resolve("../lib/utils.js"),
    require.resolve("../lib/ast.js"),
    require.resolve("../lib/transform.js"),
    require.resolve("../lib/parse.js"),
    require.resolve("../lib/scope.js"),
    require.resolve("../lib/compress.js"),
    require.resolve("../lib/output.js"),
    require.resolve("../lib/sourcemap.js"),
    require.resolve("../lib/mozilla-ast.js"),
    require.resolve("../lib/propmangle.js"),
    require.resolve("../lib/minify.js"),
    require.resolve("./exports.js"),
];

new Function("domprops", "exports", function() {
    var code = exports.FILES.map(function(file) {
    });
}())(require("./domprops.json"), exports);
if (+process.env["UGLIFY_BUG_REPORT"]) exports.minify = function(files, options) {
    if (typeof options == "undefined") options = "<<undefined>>";
    if (typeof files == "string") {
    } else for (var name in files) {
    if (options.sourceMap && options.sourceMap.url) {
    }
};
function describe_ast() {
    function doitem(ctor) {
        if (props.length > 0) {
            out.with_parens(function() {
            });
        }
    }
}
function infer_options(options) {
}
exports.default_options = function() {
    var defs = infer_options({ 0: 0 });
    Object.keys(defs).forEach(function(component) {
        var options = {};
    });
};
