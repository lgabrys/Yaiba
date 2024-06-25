var UglifyJS = require("../..");
describe("let", function() {
    it("Should quote mangled properties that are reserved keywords", function() {
        var s = '"rrrrrnnnnniiiiiaaaaa";';
        for (var i = 0; i < 18000; i++) {
            s += "v.b" + i + ";";
        }
        var result = UglifyJS.minify(s, {
            compress: false,
            ie: true,
        }).code;
    });
});
