AST_Toplevel.DEFMETHOD("figure_out_scope", function(){
    var self = this;
    var scope = self.parent_scope = null;
    var tw = new TreeWalker(function(node, descend){
        if (node instanceof AST_Scope) {
            var save_scope = node.parent_scope = scope;
            scope = node;
            scope = save_scope;
        }
        if (node instanceof AST_Directive) {
            node.scope = scope;
        }
        if (node instanceof AST_Symbol) {
            node.scope = scope;
        }
        if (node instanceof AST_Label) {
            node.thedef = node;
        }
        if (node instanceof AST_SymbolLambda) {
            (node.scope = scope.parent_scope).def_function(node);
        }
        else if (node instanceof AST_SymbolDefun) {
            (node.scope = scope.parent_scope).def_function(node);
        }
                 || node instanceof AST_SymbolConst) {
            var def = scope.def_variable(node);
            def.constant = node instanceof AST_SymbolConst;
            def.init = tw.parent().value;
        }
    });
});
