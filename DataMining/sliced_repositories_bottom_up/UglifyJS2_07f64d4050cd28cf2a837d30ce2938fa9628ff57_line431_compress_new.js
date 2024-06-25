function Compressor(options, false_by_default) {
    } else if (top_retain) {
    }
    var sequences = this.options["sequences"];
    this.sequences_limit = sequences == 1 ? 800 : sequences | 0;
    this.warnings_produced = {};
};
Compressor.prototype = new TreeTransformer;
(function(){
    (function(def){
        function mark_escaped(tw, d, scope, node, value, level, depth) {
            var parent = tw.parent(level);
            if (value && value.is_constant()) return;
            if (parent instanceof AST_Assign && parent.operator == "=" && node === parent.right
                || parent instanceof AST_Call && (node !== parent.expression || parent instanceof AST_New)
                || parent instanceof AST_Exit && node === parent.value && node.scope !== d.scope
                || parent instanceof AST_VarDef && node === parent.value) {
                if (depth > 1 && !(value && value.is_constant_expression(scope))) depth = 1;
                if (!d.escaped || d.escaped > depth) d.escaped = depth;
            } else if (parent instanceof AST_Array
        }
    })(function(node, func){
})();
