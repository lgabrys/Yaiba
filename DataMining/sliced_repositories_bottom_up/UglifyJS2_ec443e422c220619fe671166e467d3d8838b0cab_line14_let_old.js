var Uglify = require('../../');
describe("let", function() {
    it("Should not produce `let` as a variable name in mangle", function(done) {
        var s = '"use strict"; function foo() {';
        for (var i = 0; i < 21000; ++i) {
            s += "var v" + i + "=0;";
        }
        s += '}';
        var result = Uglify.minify(s, {fromString: true, compress: false});
    });
});
