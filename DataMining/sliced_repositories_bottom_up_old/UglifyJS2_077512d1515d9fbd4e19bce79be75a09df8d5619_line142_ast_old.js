function DEFNODE(type, props, methods, base) {
    if (typeof base === "undefined") base = AST_Node;
    props = props ? props.split(/\s+/) : [];
    if (base && base.PROPS) props = props.concat(base.PROPS);
}
var AST_Token = DEFNODE("Token", "type value line col pos endline endcol endpos nlb comments_before comments_after file raw", {
}, null);
var AST_Node = DEFNODE("Node", "start end", {
    _clone: function(deep) {
    },
}, null);
(AST_Node.log_function = function(fn, verbose) {
    if (!fn) {
    }
})();
