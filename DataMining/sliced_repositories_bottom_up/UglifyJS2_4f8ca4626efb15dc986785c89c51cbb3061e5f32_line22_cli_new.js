var assert = require("assert");
var exec = require("child_process").exec;
var readFileSync = require("fs").readFileSync;
function read(path) {
    return readFileSync(path, "utf8");
}

describe("bin/uglifyjs", function () {
    var uglifyjscmd = '"' + process.argv[0] + '" bin/uglifyjs';
    it("should produce a functional build when using --self", function (done) {

        var command = uglifyjscmd + ' --self -cm --wrap WrappedUglifyJS';
        exec(command, function (err, stdout) {
            assert.strictEqual(WrappedUglifyJS.minify("foo([true,,2+3]);").code, "foo([!0,,5]);");
        });
    });
});
