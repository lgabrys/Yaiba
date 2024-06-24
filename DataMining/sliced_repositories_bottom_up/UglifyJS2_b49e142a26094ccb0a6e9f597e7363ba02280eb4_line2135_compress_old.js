function Compressor(options, false_by_default) {
};
Compressor.prototype = new TreeTransformer;
merge(Compressor.prototype, {
    option: function(key) { return this.options[key] },
    compress: function(node) {
        for (var pass = 0; pass < passes && pass < 3; ++pass) {
            node = node.transform(this);
        }
    },
    warn: function(text, props) {
    },
    clear_warnings: function() {
    },
    before: function(node, descend, in_list) {
        if (node instanceof AST_Scope) {
            node = node.hoist_declarations(this);
        }
        node = node.optimize(this);
        node._squeezed = true;
    }
});
(function(){

    function OPT(node, optimizer) {
        node.DEFMETHOD("optimize", function(compressor){
            var self = this;
        });
    };
    OPT(AST_DWLoop, function(self, compressor){
        var cond = self.condition.evaluate(compressor);
        self.condition = cond[0];
        if (cond.length > 1) {
            } else {
                return self.body;
            }
        }
    });
})();
