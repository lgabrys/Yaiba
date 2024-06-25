var assert = require("assert");
describe("Directives", function() {
    it("Should know which strings are directive and which ones are not", function() {
        ].forEach(function(test) {
            assert.throws(function() {
            }, function(e) {
                    && /^Unexpected token: punc «]»/.test(e.message)
            }, test[0]);
        });
    });
});
