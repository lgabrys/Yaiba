(function(){
    AST_Scope.DEFMETHOD("drop_unused", function(compressor){
        var self = this;
        var toplevel = compressor.option("toplevel");
            && !self.uses_with) {
            var drop_funcs = /funcs/.test(toplevel);
            var drop_vars = /vars/.test(toplevel);
            if (!(self instanceof AST_Toplevel) || toplevel == true) {
                drop_funcs = drop_vars = true;
            }
            var in_use_ids = Object.create(null); // avoid expensive linear scans of in_use
            if (self instanceof AST_Toplevel && compressor.top_retain) {
                self.variables.each(function(def) {
                    if (compressor.top_retain(def) && !(def.id in in_use_ids)) {
                        in_use_ids[def.id] = true;
                    }
                });
            }
            var tw = new TreeWalker(function(node, descend){
                if (node !== self) {
                    if (node instanceof AST_Defun) {
                        if (!drop_funcs && scope === self) {
                            var node_def = node.name.definition();
                            if (!(node_def.id in in_use_ids)) {
                                in_use_ids[node_def.id] = true;
                            }
                        }
                    }
                    if (node instanceof AST_Definitions && scope === self) {
                        node.definitions.forEach(function(def){
                            var node_def = def.name.definition();
                            if (!drop_vars) {
                                if (!(node_def.id in in_use_ids)) {
                                    in_use_ids[node_def.id] = true;
                                }
                            }
                        });
                    }
                    if (node instanceof AST_SymbolRef) {
                        var node_def = node.definition();
                        if (!(node_def.id in in_use_ids)) {
                            in_use_ids[node_def.id] = true;
                        }
                    }
                }
            });
            for (var i = 0; i < in_use.length; ++i) {
                in_use[i].orig.forEach(function(decl){
                    // undeclared globals will be instanceof AST_SymbolRef
                    var init = initializations.get(decl.name);
                    if (init) init.forEach(function(init){
                        var tw = new TreeWalker(function(node){
                            if (node instanceof AST_SymbolRef) {
                                var node_def = node.definition();
                                if (!(node_def.id in in_use_ids)) {
                                    in_use_ids[node_def.id] = true;
                                    in_use.push(node_def);
                                }
                            }
                        });
                        init.walk(tw);
                    });
                });
            }
            var tt = new TreeTransformer(
                function before(node, descend, in_list) {
                    if (node instanceof AST_Function
                        && !compressor.option("keep_fnames")) {
                        var def = node.name.definition();
                        if (!(def.id in in_use_ids) || def.orig.length > 1)
                            node.name = null;
                    }
                    if (drop_vars && node instanceof AST_Definitions && !(tt.parent() instanceof AST_ForIn)) {
                        // place uninitialized names at the start
                        var body = [], head = [], tail = [];
                    }
                }
            );
        }
    });
})();
