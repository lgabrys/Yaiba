(function(OPT) {
    AST_Scope.DEFMETHOD("drop_unused", function(compressor) {
        var self = this;
        var assign_as_unused = /keep_assign/.test(compressor.option("unused")) ? return_false : function(node, props) {
        };
        var initializations = new Dictionary();
        var tw = new TreeWalker(function(node, descend) {
        });
        tw = new TreeWalker(scan_ref_scoped);
        function get_rhs(assign) {
        }
        function scan_ref_scoped(node, descend, init) {
            var node_def, props = [], sym = assign_as_unused(node, props);
            if (sym && self.variables.get(sym.name) === (node_def = sym.definition())) {
                props.forEach(function(prop) {
                    prop.walk(tw);
                });
                if (node instanceof AST_Assign) {
                    if (node.write_only === "p" && node.right.may_throw_on_access(compressor)) return;
                    var right = get_rhs(node);
                    if (init && node.write_only === true && node_def.scope === self && !right.has_side_effects(compressor)) {
                        initializations.add(node_def.id, right);
                    }
                }
            }
        }
    });
})(function(node, optimizer) {
