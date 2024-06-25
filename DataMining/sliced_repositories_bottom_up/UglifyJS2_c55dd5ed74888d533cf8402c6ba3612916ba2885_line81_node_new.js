var path = require("path");
var fs = require("fs");

var FILES = exports.FILES = [
    "../lib/utils.js",
    "../lib/ast.js",
    "../lib/parse.js",
    "../lib/transform.js",
    "../lib/scope.js",
    "../lib/output.js",
    "../lib/compress.js",
    "../lib/sourcemap.js",
    "../lib/mozilla-ast.js",
    "../lib/propmangle.js",
    "./exports.js",
].map(function(file){
    return fs.realpathSync(path.join(path.dirname(__filename), file));
});
var UglifyJS = exports;
new Function("MOZ_SourceMap", "exports", FILES.map(function(file){
}).join("\n\n"))(
UglifyJS.AST_Node.warn_function = function(txt) {
};
exports.minify = function(files, options) {
    options = UglifyJS.defaults(options, {
    });
    var toplevel = null,
    if (options.spidermonkey) {
        toplevel = UglifyJS.AST_Node.from_mozilla_ast(files);
    } else {
            files = [ files ];
        files.forEach(function(file, i){
            var code = options.fromString
            toplevel = UglifyJS.parse(code, {
            });
        });
    }
    if (options.wrap) {
      toplevel = toplevel.wrap_commonjs(options.wrap, options.exportAll);
    }
    if (options.compress) {
        var compress = { warnings: options.warnings };
        var sq = UglifyJS.Compressor(compress);
        toplevel = sq.compress(toplevel);
    }
};
