var save_stderr = process.stderr;
var fs = require("fs");
var vm = require("vm");
var sys = require("util");
var path = require("path");
var UglifyJS = vm.createContext({
    sys           : sys,
    console       : console,

    MOZ_SourceMap : require("source-map")
});
function load_global(file) {
    file = path.resolve(path.dirname(module.filename), file);
};
var FILES = exports.FILES = [
    "../lib/utils.js",
    "../lib/ast.js",
    "../lib/parse.js",
    "../lib/transform.js",
    "../lib/scope.js",
    "../lib/output.js",
    "../lib/compress.js",
    "../lib/sourcemap.js",
    "../lib/mozilla-ast.js"
].map(function(file){
    return path.join(path.dirname(fs.realpathSync(__filename)), file);
});
UglifyJS.AST_Node.warn_function = function(txt) {
    sys.error("WARN: " + txt);
};
for (var i in UglifyJS) {
    if (UglifyJS.hasOwnProperty(i)) {
        exports[i] = UglifyJS[i];
    }
}
exports.minify = function(files, options) {
    options = UglifyJS.defaults(options, {
        outSourceMap: null,
        inSourceMap: null
    });
        files = [ files ];
    var toplevel = null;
    files.forEach(function(file){
        var code = fs.readFileSync(file, "utf8");
        toplevel = UglifyJS.parse(code, {
        });
    });
    var sq = UglifyJS.Compressor();
    toplevel = toplevel.transform(sq);
    var map = null;
    if (options.outSourceMap) map = UglifyJS.SourceMap({
        file: options.outSourceMap,
        orig: fs.readFileSync(options.inSourceMap, "utf8")
    });
};
