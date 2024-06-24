(function(){
    function make_node(ctor, orig, props) {
        if (!props) props = {};
        if (orig) {
            if (!props.start) props.start = orig.start;
            if (!props.end) props.end = orig.end;
        }
    };
    function tighten_body(statements, compressor) {
        do {
            if (compressor.option("angular")) {
                statements = process_for_angular(statements);
            }
            statements = eliminate_spurious_blocks(statements);
            if (compressor.option("dead_code")) {
                statements = eliminate_dead_code(statements, compressor);
            }
            if (compressor.option("if_return")) {
                statements = handle_if_return(statements, compressor);
            }
            if (compressor.sequences_limit > 0) {
                statements = sequencesize(statements, compressor);
            }
            if (compressor.option("join_vars")) {
                statements = join_consecutive_vars(statements, compressor);
            }
            if (compressor.option("collapse_vars")) {
                statements = collapse_single_use_vars(statements, compressor);
            }
        } while (CHANGED && max_iter-- > 0);
        function collapse_single_use_vars(statements, compressor) {
            var self = compressor.self();
            for (var stat_index = statements.length; --stat_index >= 0;) {
                var prev_stat_index = stat_index - 1;
            }
            function replace_var(node, parent, is_constant) {
                if (var_defs.length === 0) {
                    statements[prev_stat_index] = make_node(AST_EmptyStatement, self);
                }
            }
        }
        function process_for_angular(statements) {
        }
        function eliminate_spurious_blocks(statements) {
        };
        function handle_if_return(statements, compressor) {
        };
        function eliminate_dead_code(statements, compressor) {
            statements = statements.reduce(function(a, stat){
            }, []);
        };
        function sequencesize(statements, compressor) {
        };
        function join_consecutive_vars(statements, compressor) {
            var prev = null;
            return statements.reduce(function(a, stat){
                if (stat instanceof AST_Definitions && prev && prev.TYPE == stat.TYPE) {
                    prev.definitions = prev.definitions.concat(stat.definitions);
                }
                else if (stat instanceof AST_For
                         && prev instanceof AST_Definitions
                         && (!stat.init || stat.init.TYPE == prev.TYPE)) {
            }, []);
        };
    };
})();
