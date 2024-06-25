var assert = require("assert");
var exec = require("child_process").exec;
describe("bin/uglifyjs", function () {
    var uglifyjscmd = '"' + process.argv[0] + '" bin/uglifyjs';
    it("Should be able to filter comments correctly with `--comment <RegExp>`", function (done) {
        var command = uglifyjscmd + ' test/input/comments/filter.js --comments /r/';
        exec(command, function (err, stdout) {

        });
    });
    it("Should append source map to output when using --source-map url=inline", function (done) {
        var command = uglifyjscmd + " test/input/issue-1323/sample.js --source-map url=inline";
        exec(command, function (err, stdout) {
            assert.strictEqual(stdout, "var bar=function(){function foo(bar){return bar}return foo}();\n" +
                "//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInRlc3QvaW5wdXQvaXNzdWUtMTMyMy9zYW1wbGUuanMiXSwibmFtZXMiOlsiYmFyIiwiZm9vIl0sIm1hcHBpbmdzIjoiQUFBQSxJQUFJQSxJQUFNLFdBQ04sU0FBU0MsSUFBS0QsS0FDVixPQUFPQSxJQUdYLE9BQU9DIn0=\n");
        });
    });
    it("Should print supported options on invalid option syntax", function(done) {
        var command = uglifyjscmd + " test/input/comments/filter.js -b ascii-only";
        exec(command, function (err, stdout, stderr) {
            assert.ok(/^Supported options:\n[\s\S]*?\nERROR: `ascii-only` is not a supported option/.test(stderr), stderr);
        });
    });
});
