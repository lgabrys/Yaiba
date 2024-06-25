(function(OPT) {
    (function(def) {
        function safe_to_assign(tw, def, declare) {
            if (def.fixed === false || def.fixed === 0) return false;
            var safe = tw.safe_ids[def.id];
            if (def.safe_ids) {
                def.safe_ids[def.id] = false;
                def.safe_ids = undefined;
            }
            if (!HOP(tw.safe_ids, def.id)) {
                if (!safe) return false;
                if (safe.read) {
                    var scope = tw.find_parent(AST_BlockScope);
                }
            }
        }
    })(function(node, func) {
})(function(node, optimizer) {
