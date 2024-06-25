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
    OPT(AST_Binary, function(self, compressor){
            : function(op, force) {
                if (force || !(self.left.has_side_effects(compressor) || self.right.has_side_effects(compressor))) {
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
                && compressor.option("unsafe")) {
                    || !self.right.expression.undeclared()) {
                    self.right = self.right.expression;
                    self.left = make_node(AST_Undefined, self.left).optimize(compressor);
                    if (self.operator.length == 2) self.operator += "=";
                }
            }
        }
        if (compressor.option("comparisons")) {
        }
    });
})();
