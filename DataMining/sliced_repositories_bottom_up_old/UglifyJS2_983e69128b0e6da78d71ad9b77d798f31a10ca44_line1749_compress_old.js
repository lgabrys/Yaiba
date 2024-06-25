function Compressor(options, false_by_default) {
    var top_retain = this.options["top_retain"];
    } else if (top_retain) {
        if (typeof top_retain == "string") {
            top_retain = top_retain.split(/,/);
        }
    }
    var toplevel = this.options["toplevel"];
    this.toplevel = typeof toplevel == "string" ? {
    } : {
};

Compressor.prototype = new TreeTransformer;
merge(Compressor.prototype, {
    option: function(key) { return this.options[key] },
    before: function(node, descend, in_list) {
        if (node instanceof AST_Scope) {
            node = node.hoist_properties(this);
            node = node.hoist_declarations(this);
        }
    }
});
(function(){
    (function(def){
        function push(tw) {
            tw.safe_ids = Object.create(tw.safe_ids);
        }
        function pop(tw) {
            tw.safe_ids = Object.getPrototypeOf(tw.safe_ids);
        }
        function safe_to_assign(tw, def, value) {
            if (def.fixed === null && def.safe_ids) {
                def.safe_ids[def.id] = false;
            }
        }
        def(AST_Do, function(tw) {
            var saved_loop = tw.in_loop;
            tw.in_loop = this;
            pop(tw);
            tw.in_loop = saved_loop;
        });
        def(AST_For, function(tw) {
            var saved_loop = tw.in_loop;
            tw.in_loop = this;
            this.body.walk(tw);
            tw.in_loop = saved_loop;
        });
        def(AST_ForIn, function(tw) {
            var saved_loop = tw.in_loop;
            tw.in_loop = this;
            push(tw);
            tw.in_loop = saved_loop;
        });
    })(function(node, func){
    function make_node(ctor, orig, props) {
        if (!props) props = {};
        if (orig) {
            if (!props.start) props.start = orig.start;
            if (!props.end) props.end = orig.end;
        }
    };
    function make_sequence(orig, expressions) {
    }
    function tighten_body(statements, compressor) {
        var scope = compressor.find_parent(AST_Scope);
        function sequencesize(statements, compressor) {
            var seq = [], n = 0;
            function push_seq() {
                var body = make_sequence(seq[0], seq);
                statements[n++] = make_node(AST_SimpleStatement, body, { body: body });
                seq = [];
            }
            for (var i = 0, len = statements.length; i < len; i++) {
                var stat = statements[i];
                if (stat instanceof AST_SimpleStatement) {
                    if (seq.length >= compressor.sequences_limit) push_seq();
                } else if (stat instanceof AST_Definitions && declarations_only(stat)
                    || stat instanceof AST_Defun) {
                    statements[n++] = stat;
                } else {
                    statements[n++] = stat;
                }
            }
            statements.length = n;
        }
        function join_object_assignments(defn, body) {
            if (!(defn instanceof AST_Definitions)) return;
            var def = defn.definitions[defn.definitions.length - 1];
            if (!(def.value instanceof AST_Object)) return;
            var exprs;
            if (body instanceof AST_Assign) {
                exprs = [ body ];
            } else if (body instanceof AST_Sequence) {
                exprs = body.expressions.slice();
            }
            if (!exprs) return;
            var trimmed = false;
            do {
                var node = exprs[0];
                if (!(node.left instanceof AST_PropAccess)) break;
                var sym = node.left.expression;
                if (!node.right.is_constant_expression(scope)) break;
                var prop = node.left.property;
                if (prop instanceof AST_Node) {
                    prop = prop.evaluate(compressor);
                }
                if (prop instanceof AST_Node) break;
                def.value.properties.push(make_node(AST_ObjectKeyVal, node, {
                    key: prop,
                    value: node.right
                }));
            } while (exprs.length);
        }
    }
})();
