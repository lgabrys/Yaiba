var UglifyJS = require("../node");
describe("Getters and setters", function() {
    it("Should not accept operator symbols as getter/setter name", function() {
        var testCase = function(data) {
            return function() {
            };
        };
        var fail = function(data) {
            return function (e) {
                return e instanceof UglifyJS.JS_Parse_Error &&
                    e.message === "Unexpected token: operator (" + data.operator + ")";
            };
        };
    });
});
