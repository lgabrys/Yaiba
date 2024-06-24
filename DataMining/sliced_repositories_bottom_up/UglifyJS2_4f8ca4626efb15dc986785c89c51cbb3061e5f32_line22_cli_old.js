var assert = require("assert");
var exec = require("child_process").exec;
describe("bin/uglifyjs", function () {
    var uglifyjscmd = '"' + process.argv[0] + '" bin/uglifyjs';
    it("should produce a functional build when using --self", function (done) {
        var command = uglifyjscmd + ' --self -cm --wrap WrappedUglifyJS';
        exec(command, function (err, stdout) {
            assert.strictEqual(true, WrappedUglifyJS.parse('foo;') instanceof WrappedUglifyJS.AST_Node);
        });
    });
});
