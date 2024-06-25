// workaround for tty output truncation upon process.exit()
[process.stdout, process.stderr].forEach(function(stream){
    if (stream._handle && stream._handle.setBlocking)
        stream._handle.setBlocking(true);
});

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
new Function("MOZ_SourceMap", "exports", "DEBUG", FILES.map(function(file){
    return fs.readFileSync(file, "utf8");
}).join("\n\n"))(
UglifyJS.AST_Node.warn_function = function(txt) {
    console.error("WARN: %s", txt);
};
exports.minify = function(files, options) {
    options = UglifyJS.defaults(options, {
        spidermonkey     : false,
        outSourceMap     : null,
        sourceRoot       : null,
        inSourceMap      : null,
        sourceMapUrl     : null,
        fromString       : false,
        warnings         : false,
        mangle           : {},
        mangleProperties : false,
        nameCache        : null,
        output           : null,
        compress         : {},
        parse            : {}
    });
    if (options.mangleProperties || options.nameCache) {
        options.mangleProperties.cache = UglifyJS.readNameCache(options.nameCache, "props");
    }
    var inMap = options.inSourceMap;
    if (typeof options.inSourceMap == "string") {
        inMap = JSON.parse(fs.readFileSync(options.inSourceMap, "utf8"));
    }
};
