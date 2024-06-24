(function(OPT) {
    OPT(AST_Call, function(self, compressor) {
        var exp = self.expression;
            && exp.name == "Function") {
            })) {
                try {
                    self.args = [
                    ];
                } catch (ex) {
            }
        }
        var fn = exp instanceof AST_SymbolRef ? exp.fixed_value() : exp;
        var is_func = fn instanceof AST_Lambda && (!is_async(fn)
            || compressor.option("awaits") && compressor.parent() instanceof AST_Await);
        var can_drop = is_func && all(fn.argnames, function(argname, index) {
            if (argname instanceof AST_DefaultValue) {
                argname = argname.name;
            }
        });
        var can_inline = can_drop && compressor.option("inline") && !self.is_expr_pure(compressor);
        if (is_func) {
            if (can_inline
                && !(fn.name && fn instanceof AST_Function)
                && !fn.contains_this()) {
        }
    });
})(function(node, optimizer) {
