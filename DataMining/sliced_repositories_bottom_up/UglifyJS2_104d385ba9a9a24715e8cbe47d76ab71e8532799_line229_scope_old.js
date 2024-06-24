AST_Toplevel.DEFMETHOD("figure_out_scope", function(options) {
    options = defaults(options, {
    });
    var self = this;
    var defun = null;
    var exported = false;
    var scope = self.parent_scope = null;
    var tw = new TreeWalker(function(node, descend) {
        if (node instanceof AST_DefClass) {
            var save_exported = exported;
            exported = tw.parent() instanceof AST_ExportDeclaration;
            exported = save_exported;
        }
        if (node instanceof AST_Definitions) {
            var save_exported = exported;
            exported = tw.parent() instanceof AST_ExportDeclaration;
            exported = save_exported;
        }
        if (node instanceof AST_LambdaDefinition) {
            var save_exported = exported;
            exported = tw.parent() instanceof AST_ExportDeclaration;
            exported = save_exported;
        }
        if (node instanceof AST_Symbol) {
            node.scope = scope;
        }
        if (node instanceof AST_Label) {
            node.thedef = node;
            node.references = [];
        }
        if (node instanceof AST_SymbolCatch) {
            scope.def_variable(node).defun = defun;
        } else if (node instanceof AST_SymbolConst) {
            var def = scope.def_variable(node);
            def.defun = defun;
            if (exported) def.exported = true;
        } else if (node instanceof AST_SymbolDefun) {
            var def = defun.def_function(node, tw.parent());
            if (exported) def.exported = true;
        } else if (node instanceof AST_SymbolFunarg) {
        } else if (node instanceof AST_SymbolLambda) {
            var def = defun.def_function(node, node.name == "arguments" ? undefined : defun);
            if (options.ie) def.defun = defun.parent_scope.resolve();
        } else if (node instanceof AST_SymbolLet) {
    });
});
