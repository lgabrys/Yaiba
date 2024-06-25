function Compressor(options, false_by_default) {
    var toplevel = this.options["toplevel"];
    this.toplevel = typeof toplevel == "string" ? {
    } : {
};

Compressor.prototype = new TreeTransformer;
merge(Compressor.prototype, {
    option: function(key) { return this.options[key] },
});
(function(){
    function OPT(node, optimizer) {
    };
    AST_Toplevel.DEFMETHOD("reset_opt_flags", function(compressor) {
        var reduce_vars = compressor.option("reduce_vars");
        var tw = new TreeWalker(function(node, descend) {
            node._squeezed = false;
            node._optimized = false;
            if (reduce_vars) {
                if (node instanceof AST_SymbolCatch) {
                    node.definition().fixed = false;
                }
                if (node instanceof AST_Defun) {
                    node.inlined = false;
                }
                if (node instanceof AST_Function) {
                    node.inlined = false;
                }
            }
        });
        function mark_escaped(d, scope, node, value, level) {
            var parent = tw.parent(level);
                if (level > 0 && value.is_constant_expression(scope)) return;
            if (parent instanceof AST_Assign && parent.operator == "=" && node === parent.right
                || parent instanceof AST_Call && node !== parent.expression
                || parent instanceof AST_Exit && node === parent.value && node.scope !== d.scope
                || parent instanceof AST_VarDef && node === parent.value) {
                d.escaped = true;
            }
        }
    });
})();
