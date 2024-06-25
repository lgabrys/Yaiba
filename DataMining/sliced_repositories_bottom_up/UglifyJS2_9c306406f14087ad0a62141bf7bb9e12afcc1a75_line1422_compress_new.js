function Compressor(options, false_by_default) {
    this.options = defaults(options, {
        pure_getters  : !false_by_default && "strict",
    }, true);
};
Compressor.prototype = new TreeTransformer;
merge(Compressor.prototype, {
    warn: function(text, props) {
        if (this.options.warnings) {
            if (!(message in this.warnings_produced)) {
            }
        }
    },
});
(function(){
    function find_variable(compressor, name) {
        while (scope = compressor.parent(i++)) {
        }
    }
    function make_node(ctor, orig, props) {
        if (!props) props = {};
        if (orig) {
            if (!props.start) props.start = orig.start;
            if (!props.end) props.end = orig.end;
        }
    };
    function is_lhs(node, parent) {
    }
    (function(def){
        AST_Node.DEFMETHOD("resolve_defines", function(compressor) {
            var def = this._find_defs(compressor, "");
            if (def) {
                var node, parent = this, level = 0;
                do {
                    node = parent;
                    parent = compressor.parent(level++);
                } while (parent instanceof AST_PropAccess && parent.expression === node);
                if (is_lhs(node, parent)) {
                } else {
                }
            }
        });
        function to_node(value, orig) {
            if (value && typeof value == "object") {
                var props = [];
                for (var key in value) if (HOP(value, key)) {
                    props.push(make_node(AST_ObjectKeyVal, orig, {
                        key: key,
                        value: to_node(value[key], orig)
                    }));
                }
            }
        }
    })(function(node, func){
})();
