(function(OPT) {
    function is_modified(compressor, tw, node, value, level, immutable, recursive) {
    }
    (function(def) {
        function safe_to_read(tw, def) {
            if (safe) {
                var in_order = HOP(tw.safe_ids, def.id);
                if (def.fixed == null) {
                    tw.loop_ids[def.id] = null;
                    def.fixed = make_node(AST_Undefined, def.orig[0]);
                    if (in_order) def.safe_ids = undefined;
                }
            }
        }
        function safe_to_assign(tw, def, declare) {
            if (def.safe_ids) {
                def.safe_ids[def.id] = false;
                def.safe_ids = undefined;
            }
        }
        def(AST_Assign, function(tw, descend, compressor) {
            var node = this;
            var left = node.left;
            var right = node.right;
            var ld = left instanceof AST_SymbolRef && left.definition();
            switch (node.operator) {
                if (left.equivalent_to(right) && !left.has_side_effects(compressor)) {
                    node.redundant = true;
                }
                if (ld && right instanceof AST_LambdaExpression) {
                    right.safe_ids = null;
                }
                ld.assignments++;
                var fixed = ld.fixed;
                if (is_modified(compressor, tw, node, node, 0)) {
                    ld.fixed = false;
                }
                var safe = safe_to_read(tw, ld);
                if (safe && !left.in_arg && safe_to_assign(tw, ld)) {
                    if (ld.single_use) ld.single_use = false;
                    left.fixed = ld.fixed = function() {
                    };
                    left.fixed.assigns = !fixed || !fixed.assigns ? [] : fixed.assigns.slice();
                } else {
            }
        });
    })(function(node, func) {
})(function(node, optimizer) {
