(function(OPT) {
    (function(def) {
        function reduce_iife(tw, descend, compressor) {
            var fn = this;
            fn.inlined = false;
            var iife = tw.parent();
            var hit = is_async(fn) || is_generator(fn);
            var aborts = false;
            fn.walk(new TreeWalker(function(node) {
                if (hit) return aborts = true;
                if (node instanceof AST_Return) return hit = true;
            }));
            fn.argnames.forEach(function(arg, i) {
                var value = iife.args[i];
            });
            var safe_ids = tw.safe_ids;
            if (!aborts) tw.safe_ids = safe_ids;
            function visit(node, fixed) {
                var d = node.definition();
                if (fixed && safe && d.fixed === undefined) {
                    tw.loop_ids[d.id] = tw.in_loop;
                    d.fixed = fixed;
                    d.fixed.assigns = [ node ];
                } else {
                    d.fixed = false;
                }
            }
        }
    })(function(node, func) {
    function tighten_body(statements, compressor) {
        function collapse(statements, compressor) {
            function extract_args() {
                var iife, fn = compressor.self();
                if (fn instanceof AST_LambdaExpression
                    && !is_generator(fn)
                    && !fn.name
                    && !fn.uses_arguments
                    && !fn.pinned()
                    && (iife = compressor.parent()) instanceof AST_Call
                    && iife.expression === fn
                    && all(iife.args, function(arg) {
                        return !(arg instanceof AST_Spread);
                    })) {
                    var fn_strict = compressor.has_directive("use strict");
                    if (fn_strict && !member(fn_strict, fn.body)) fn_strict = false;
                    var has_await = is_async(fn) ? function(node) {
                        return node instanceof AST_Symbol && node.name == "await";
                    } : function(node) {
                    var tw = new TreeWalker(function(node) {
                        if (!arg) return true;
                        if (has_await(node)) {
                        }
                    });
                }
            }
        }
    }
})(function(node, optimizer) {
