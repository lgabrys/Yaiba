function tokenizer($TEXT, filename, html5_comments) {
};
function parse($TEXT, options) {
    options = defaults(options, {
    });
    var S = {
        input         : (typeof $TEXT == "string"
                         ? tokenizer($TEXT, options.filename,
                                     options.html5_comments)
                         : $TEXT),
        token         : null,
        prev          : null,
        peeked        : null,
        in_function   : 0,
        in_directives : true,
        in_loop       : 0,
        labels        : []
    };
    S.token = next();
    function is(type, value) {
    };
    function peek() { return S.peeked || (S.peeked = S.input()); };
    function next() {
        S.prev = S.token;
        if (S.peeked) {
            S.token = S.peeked;
            S.peeked = null;
        } else {
            S.token = S.input();
        }
        S.in_directives = S.in_directives && (
            S.token.type == "string" || is("punc", ";")
        );
    };
    function handle_regexp() {
        if (is("operator", "/") || is("operator", "/=")) {
            S.peeked = null;
            S.token = S.input(S.token.value.substr(1)); // force regexp
        }
    };
    var function_ = function(ctor) {
        return new ctor({
            body: (function(loop, labels){
                ++S.in_function;
                S.in_directives = true;
                S.in_loop = 0;
                S.labels = [];
                --S.in_function;
                S.in_loop = loop;
                S.labels = labels;
            })(S.in_loop, S.labels)
        });
    };
    function expr_ops(no_in) {
    };
    var maybe_conditional = function(no_in) {
        var start = S.token;
        var expr = expr_ops(no_in);
        if (is("operator", "?")) {
            var yes = expression(false);
            return new AST_Conditional({
                start       : start,
                condition   : expr,
                consequent  : yes,
                alternative : expression(false, no_in),
                end         : peek()
            });
        }
    };
};
