AST_Toplevel.DEFMETHOD("figure_out_scope", function(options) {
    options = defaults(options, {
    });
    var self = this;
    var scope = self.parent_scope = null;
    var defun = null;
    var tw = new TreeWalker(function(node, descend) {
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
        if (node instanceof AST_SymbolDefun) {
            (node.scope = defun.parent_scope.resolve()).def_function(node, defun);
        } else if (node instanceof AST_SymbolLambda) {
            var def = defun.def_function(node, node.name == "arguments" ? undefined : defun);
            if (options.ie8) def.defun = defun.parent_scope.resolve();
        } else if (node instanceof AST_SymbolVar) {
            if (defun !== scope) {
                var def = scope.find_variable(node);
                if (node.thedef !== def) {
                    node.thedef = def;
                }
            }
        } else if (node instanceof AST_SymbolCatch) {
            scope.def_variable(node).defun = defun;
        }
    });
    self.globals = new Dictionary();
    var tw = new TreeWalker(function(node) {
        if (node instanceof AST_SymbolRef) {
            var name = node.name;
            var sym = node.scope.find_variable(name);
            if (!sym) {
                sym = self.def_global(node);
            } else if (sym.scope instanceof AST_Lambda && name == "arguments") {
                sym.scope.uses_arguments = true;
            }
            node.thedef = sym;
        }
    });
    if (options.ie8) self.walk(new TreeWalker(function(node) {
        if (node instanceof AST_SymbolLambda) {
            var def = node.thedef;
            if (def.init) node.thedef.init = def.init;
        }
    }));
});
