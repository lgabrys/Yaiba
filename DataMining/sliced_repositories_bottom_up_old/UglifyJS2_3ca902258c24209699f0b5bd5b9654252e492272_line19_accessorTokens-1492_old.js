var UglifyJS = require("../node");
var assert = require("assert");
describe("Accessor tokens", function() {
    it("Should fill the token information for accessors (issue #1492)", function() {
        var checkWalker = new UglifyJS.TreeWalker(function(node, descend) {
            if (node instanceof UglifyJS.AST_ObjectProperty) {
                assert(node.key instanceof UglifyJS.AST_SymbolRef);
            }
        });
    });
});
