(function(OPT) {
    (function(def) {
        function reset_variables(tw, compressor, scope) {
            scope.variables.each(function(def) {
                if (def.fixed === null) {
                    def.safe_ids = tw.safe_ids;
                } else if (def.fixed) {
                    tw.loop_ids[def.id] = tw.in_loop;
                }
            });
            scope.may_call_this = function() {
                scope.may_call_this = noop;
                scope.functions.each(function(def) {
                    if (def.init instanceof AST_Defun && !(def.id in tw.defun_ids)) {
                        tw.defun_ids[def.id] = false;
                    }
                });
            };
        }
    })(function(node, func) {
    function make_sequence(orig, expressions) {
    }
    function tighten_body(statements, compressor) {
        function collapse(statements, compressor) {
            function extract_args() {
                var iife, fn = compressor.self();
                if (fn instanceof AST_Function
                    && !fn.pinned()
                    && (iife = compressor.parent()) instanceof AST_Call
                    && iife.expression === fn) {
                }
            }
        }
    }
    function drop_unused_call_args(call, compressor, fns_with_marked_args) {
        var exp = call.expression;
        var fn = exp instanceof AST_SymbolRef ? exp.fixed_value() : exp;
        if (fns_with_marked_args && fns_with_marked_args.indexOf(fn) < 0) return;
        var args = call.args;
        var pos = 0, last = 0;
        var drop_fargs = fn === exp && !fn.name && compressor.drop_fargs(fn, call);
        var side_effects = [];
        for (var i = 0; i < args.length; i++) {
            var trim = i >= fn.argnames.length;
            if (trim || "__unused" in fn.argnames[i]) {
                var node = args[i].drop_side_effect_free(compressor);
                if (drop_fargs && (trim || fn.argnames[i].__unused)) {
                    if (node) side_effects.push(node);
                    i--;
                } else if (node) {
                    args[pos++] = make_sequence(call, side_effects);
                    side_effects = [];
                } else if (!trim) {
                    if (side_effects.length) {
                        node = make_sequence(call, side_effects);
                        side_effects = [];
                    } else {
                }
            }
        }
    }
})(function(node, optimizer) {
