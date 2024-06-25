var save_stderr = process.stderr;
var fs = require("fs");
var vm = require("vm");
var path = require("path");
var UglifyJS = vm.createContext({
});
function load_global(file) {
    file = path.resolve(path.dirname(module.filename), file);
};
var FILES = exports.FILES = [
].map(function(file){
UglifyJS.AST_Node.warn_function = function(txt) {
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
        orig: options.inSourceMap
    });
};
