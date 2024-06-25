(function(){
    function OPT(node, optimizer) {
    };
    function make_node_from_constant(val, orig) {
    };
    function best_of_expression(ast1, ast2) {
    }
    OPT(AST_SymbolRef, function(self, compressor){
        if (compressor.option("evaluate") && compressor.option("reduce_vars")) {
            var d = self.definition();
            if (d.fixed) {
                if (d.should_replace === undefined) {
                    var init = d.fixed.evaluate(compressor);
                    if (init !== d.fixed) {
                        init = make_node_from_constant(init, d.fixed).optimize(compressor);
                        init = best_of_expression(init, d.fixed);
                        var value = init.print_to_string().length;
                        var name = d.name.length;
                        var freq = d.references.length;
                        var overhead = d.global || !freq ? 0 : (name + 2 + value) / freq;
                        d.should_replace = value <= name + overhead ? init : false;
                    } else {
                        d.should_replace = false;
                    }
                }
                if (d.should_replace) {
                    return d.should_replace.clone(true);
                }
            }
        }
    });
})();
