function SymbolDef(scope, index, orig) {
};
SymbolDef.prototype = {
    unmangleable: function(options) {
    },
};
AST_Toplevel.DEFMETHOD("figure_out_scope", function(){
    var self = this;
    var scope = self.parent_scope = null;
    var nesting = 0;
    var tw = new TreeWalker(function(node, descend){
        if (node instanceof AST_Scope) {
            var save_scope = node.parent_scope = scope;
            ++nesting;
            scope = node;
            scope = save_scope;
            --nesting;
        }
        if (node instanceof AST_Directive) {
            node.scope = scope;
        }
        if (node instanceof AST_Symbol) {
            node.scope = scope;
        }
        else if (node instanceof AST_SymbolDefun) {
            (node.scope = scope.parent_scope).def_function(node);
        }
    });
    var globals = self.globals = new Dictionary();
    var tw = new TreeWalker(function(node, descend){
        if (node instanceof AST_SymbolRef) {
            var name = node.name;
            var sym = node.scope.find_variable(name);
            if (!sym) {
                var g;
                if (globals.has(name)) {
                    g = globals.get(name);
                } else {
                    g = new SymbolDef(self, globals.size(), node);
                    g.undeclared = true;
                    g.global = true;
                }
                node.thedef = g;
                if (name == "arguments") {
                }
            } else {
        }
    });
});
