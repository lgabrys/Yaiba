(function(){
    function OPT(node, optimizer) {
    };
    function make_node(ctor, orig, props) {
        if (!props) props = {};
        if (orig) {
            if (!props.start) props.start = orig.start;
            if (!props.end) props.end = orig.end;
        }
    };
    function best_of(ast1, ast2) {
    };
    OPT(AST_Conditional, function(self, compressor){
        if (self.condition instanceof AST_Seq) {
            self.condition = self.condition.cdr;
        }
        var cond = self.condition.evaluate(compressor);
        var negated = cond[0].negate(compressor);
        if (best_of(cond[0], negated) === negated) {
            self = make_node(AST_Conditional, self, {
            });
        }
        var consequent = self.consequent;
        var alternative = self.alternative;
            && consequent.expression.equivalent_to(alternative.expression)) {
            if (consequent.args.length == 1) {
                consequent.args[0] = make_node(AST_Conditional, self, {
                });
            }
        }
            && consequent.equivalent_to(alternative)) {
            var consequent_value = consequent.constant_value(compressor);
        }
    });
})();
