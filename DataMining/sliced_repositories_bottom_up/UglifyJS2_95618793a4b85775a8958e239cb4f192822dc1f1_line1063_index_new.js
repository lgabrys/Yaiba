
var UglifyJS = require("../..");
var sandbox = require("../sandbox");
function STMT_(name) {
}
var num_iterations = +process.argv[2] || 1/0;
for (var i = 2; i < process.argv.length; ++i) {
    switch (process.argv[i]) {
        if (!MAX_GENERATED_TOPLEVELS_PER_RUN) throw new Error("Must generate at least one toplevel per run");
        break;
        if (!(STMT_FIRST_LEVEL_OVERRIDE >= 0)) throw new Error("Unknown statement name; use -? to get a list");
        break;
    }
}
function createTopLevelCode() {
}
function writeln(stream, msg) {
}
function errorln(msg) {
    writeln(process.stderr, msg);
}
function try_beautify(code, toplevel, result, printfn) {
    var beautified = UglifyJS.minify(code, {
        compress: false,
        mangle: false,
        output: {
            beautify: true,
            braces: true,
        },
    });
}
var default_options = UglifyJS.default_options();
function log_suspects(minify_options, component) {
    var options = component in minify_options ? minify_options[component] : true;
    if (typeof options != "object") options = {};
}
function orig_code(unsafe_math) {
    return unsafe_math ? original_code.replace(/( - 0\.1){3}/g, " - 0.3") : original_code;
}
function log(options) {
    options = JSON.parse(options);
    try_beautify(orig_code(options.compress && options.compress.unsafe_math), options.toplevel, original_result, errorln);
}
