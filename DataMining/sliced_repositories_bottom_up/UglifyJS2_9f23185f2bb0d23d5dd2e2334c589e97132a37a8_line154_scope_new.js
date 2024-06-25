AST_Toplevel.DEFMETHOD("figure_out_scope", function(options){
    options = defaults(options, {
    });
    var self = this;
    var scope = self.parent_scope = null;
    var defun = null;
    var tw = new TreeWalker(function(node, descend){
        if (node instanceof AST_Catch) {
            var save_scope = scope;
            scope = new AST_Scope(node);
            scope = save_scope;
        }
        if (node instanceof AST_Scope) {
            var save_scope = scope;
            var save_defun = defun;
            defun = scope = node;
            scope = save_scope;
            defun = save_defun;
        }
        if (node instanceof AST_Symbol) {
            node.scope = scope;
        }
        if (node instanceof AST_Label) {
            node.thedef = node;
            node.references = [];
        }
        if (node instanceof AST_SymbolLambda) {
            defun.def_function(node, node.name == "arguments" ? undefined : defun);
        }
    });
});
