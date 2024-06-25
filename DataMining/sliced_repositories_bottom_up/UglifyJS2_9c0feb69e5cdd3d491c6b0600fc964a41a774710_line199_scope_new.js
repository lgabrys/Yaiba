AST_Toplevel.DEFMETHOD("figure_out_scope", function(options) {
    options = defaults(options, {
    });
    var self = this;
    var defun = null;
    var scope = self.parent_scope = null;
    var tw = new TreeWalker(function(node, descend) {
        if (node instanceof AST_Symbol) {
            node.scope = scope;
        }
        if (node instanceof AST_Label) {
            node.thedef = node;
            node.references = [];
        }
        if (node instanceof AST_SymbolCatch) {
            scope.def_variable(node).defun = defun;
        } else if (node instanceof AST_SymbolDefun) {
        function walk_scope(descend) {
            var save_defun = defun;
            var save_scope = scope;
            if (node instanceof AST_Scope) defun = node;
            scope = node;
            scope = save_scope;
            defun = save_defun;
        }
        function entangle(defun, scope) {
            var def = scope.find_variable(node);
            node.thedef = def;
        }
    });
    self.make_def = function(orig, init) {
    };
    self.globals = new Dictionary();
    var tw = new TreeWalker(function(node) {
        if (node instanceof AST_SymbolRef) {
            var name = node.name;
            var sym = node.scope.find_variable(name);
            if (!sym) {
                sym = self.def_global(node);
            } else if (name == "arguments" && sym.scope instanceof AST_Lambda) {
            }
        }
    });
});
