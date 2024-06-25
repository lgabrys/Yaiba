var path = require("path");
var fs = require("fs");
var vm = require("vm");
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
    });
        sourcesContent = {};
    } else {
            files = [ files ];
        files.forEach(function(file){
            var code = options.fromString
            sourcesContent[file] = code;
        });
    }
    var inMap = options.inSourceMap;
    var output = {};
    if (typeof options.inSourceMap == "string") {
        inMap = fs.readFileSync(options.inSourceMap, "utf8");
    }
    if (options.outSourceMap) {
        output.source_map = UglifyJS.SourceMap({
            file: options.outSourceMap,
            orig: inMap,
            root: options.sourceRoot
        });
        if (options.sourceMapIncludeSources) {
            for (var file in sourcesContent) {
                if (sourcesContent.hasOwnProperty(file)) {
                    output.source_map.get().setSourceContent(file, sourcesContent[file]);
                }
            }
        }
    }
};
