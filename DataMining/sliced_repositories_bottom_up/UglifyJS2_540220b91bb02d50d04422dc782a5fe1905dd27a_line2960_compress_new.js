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
    OPT(AST_Call, function(self, compressor){
        var exp = self.expression;
            && exp instanceof AST_SymbolRef) {
            var def = exp.definition();
            var fixed = exp.fixed_value();
            if (fixed instanceof AST_Defun) {
                def.fixed = fixed = make_node(AST_Function, fixed, fixed).clone(true);
            }
            if (fixed instanceof AST_Function) {
                exp = fixed;
                if (compressor.option("unused")
                    && compressor.find_parent(AST_Scope) === exp.parent_scope) {
                }
            }
        }
    });
})();
