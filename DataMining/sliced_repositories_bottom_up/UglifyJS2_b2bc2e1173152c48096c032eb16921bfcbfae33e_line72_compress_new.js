var fs = require("fs");
var U = require("./node");
if (process.argv.length > 3) {
    var minify_options = require("./ufuzz/options.json").map(JSON.stringify);
} else {
function parse_test(file) {
    var script = fs.readFileSync(file, "utf8");
    try {
        var ast = U.parse(script, { filename: file, module: "" });
    } catch (e) {
}
