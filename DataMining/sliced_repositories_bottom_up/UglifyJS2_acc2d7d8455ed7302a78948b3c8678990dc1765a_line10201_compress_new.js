(function(OPT) {
    function read_property(obj, node) {
        } else if (obj instanceof AST_Lambda) {
            if (key == "length") {
                obj.length_read = true;
            }
        } else if (obj instanceof AST_Object) {
    }
    (function(def) {
        function mark_escaped(tw, d, scope, node, value, level, depth) {
            var parent = tw.parent(level);
            if (has_escaped(d, node, parent)) {
                if (depth > 1 && !(value && value.is_constant_expression(scope))) depth = 1;
                if (!d.escaped.depth || d.escaped.depth > depth) d.escaped.depth = depth;
            } else if (value_in_use(node, parent)) {
            } else if (parent instanceof AST_PropAccess && parent.expression === node) {
                value = read_property(value, parent);
            }
            d.direct_access = true;
        }
    })(function(node, func) {
    OPT(AST_Object, function(self, compressor) {
        var found = false;
        var generated = false;
        self.properties.forEach(function(prop) {
            if (!(prop instanceof AST_Spread)) return process(prop);
            found = true;
            } else {
                generated = true;
            }
        });
        function process(prop) {
            var key = prop.key;
            if (key instanceof AST_Node) {
                found = true;
                key = key.evaluate(compressor);
                if (key === prop.key) {
                    generated = true;
                } else {
                    key = prop.key = "" + key;
                }
            }
            if (found && !generated && typeof key == "string" && /^[1-9]*[0-9]$/.test(key)) {
                generated = true;
            }
        }
    });
})(function(node, optimizer) {
