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
    OPT(AST_Binary, function(self, compressor){
        function reverse(op) {
            if (!(self.left.has_side_effects() && self.right.has_side_effects())) {
                if (op) self.operator = op;
                var tmp = self.left;
                self.left = self.right;
                self.right = tmp;
            }
        };
        self = self.lift_sequences(compressor);
        if (compressor.option("comparisons")) switch (self.operator) {
                (self.left.is_boolean() && self.right.is_boolean())) {
                self.operator = self.operator.substr(0, 2);
            }
                && self.right.operator == "typeof") {
                    || !self.right.expression.undeclared()) {
                    self.left = self.right.expression;
                    self.right = make_node(AST_Undefined, self.left).optimize(compressor);
                    if (self.operator.length == 2) self.operator += "=";
                }
            }
        }
        if (compressor.option("comparisons")) {
                || compressor.parent() instanceof AST_Assign) {
                var negated = make_node(AST_UnaryPrefix, self, {
                });
                self = best_of(self, negated);
            }
        }
        if (self.operator == "+" && self.right instanceof AST_String
            && self.left.operator == "+" && self.left.is_string()) {
        }
    });
})();
