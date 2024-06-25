function Compressor(options, false_by_default) {
    var top_retain = this.options["top_retain"];
    if (top_retain instanceof RegExp) {
        this.top_retain = function(def) {
            return top_retain.test(def.name);
        };
    } else if (typeof top_retain == "function") {
    } else if (top_retain) {
        if (typeof top_retain == "string") {
            top_retain = top_retain.split(/,/);
        }
        this.top_retain = function(def) {
        };
    }
}
(function(OPT) {
    AST_Scope.DEFMETHOD("drop_unused", function(compressor) {
        var self = this;
        var drop_vars = !(self instanceof AST_Toplevel) || compressor.toplevel.vars;
            && self.body[0].value == "use strict") {
            self.body.length = 0;
        }
        function scan_ref_scoped(node, descend, init) {
            if (node instanceof AST_ForIn) {
                if (!drop_vars || !compressor.option("loops")) return;
            }
        }
    });
})(function(node, optimizer) {
