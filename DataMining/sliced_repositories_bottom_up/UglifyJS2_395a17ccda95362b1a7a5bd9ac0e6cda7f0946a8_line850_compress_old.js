function Compressor(options, false_by_default) {
    var top_retain = this.options["top_retain"];
    } else if (top_retain) {
        if (typeof top_retain == "string") {
            top_retain = top_retain.split(/,/);
        }
    }
};
(function(){
    AST_Node.DEFMETHOD("reset_opt_flags", function(compressor, rescan) {
        var reduce_vars = rescan && compressor.option("reduce_vars");
        var tw = new TreeWalker(function(node, descend) {
            node._squeezed = false;
            node._optimized = false;
            if (reduce_vars) {
                if (node instanceof AST_SymbolCatch) {
                    node.definition().fixed = false;
                }
                if (node instanceof AST_Function) {
                    var iife;
                    if (!node.name
                        && (iife = tw.parent()) instanceof AST_Call
                        && iife.expression === node) {
                        //   (function(a,b) {...})(c,d) => (function() {var a=c,b=d; ...})()
                    }
                }
                if (node instanceof AST_For) {
                    return true;
                }
                if (node instanceof AST_Try) {
                    if (node.bcatch) {
                    }
                }
            }
        });
    });

    function make_node(ctor, orig, props) {
        if (!props) props = {};
        if (orig) {
            if (!props.start) props.start = orig.start;
            if (!props.end) props.end = orig.end;
        }
    };
    function tighten_body(statements, compressor) {
        function collapse(statements, compressor) {
            function extract_args() {
                var iife, fn = compressor.self();
                if (fn instanceof AST_Function
                    && !fn.name
                    && !fn.uses_arguments
                    && !fn.uses_eval
                    && (iife = compressor.parent()) instanceof AST_Call
                    && iife.expression === fn) {
                    var names = Object.create(null);
                    for (var i = fn.argnames.length; --i >= 0;) {
                        var sym = fn.argnames[i];
                        if (sym.name in names) continue;
                        names[sym.name] = true;
                        var arg = iife.args[i];
                        if (!arg) arg = make_node(AST_Undefined, sym);
                                if (!arg) return true;
                    }
                }
            }
        }
    }
})();
