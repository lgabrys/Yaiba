function tokenizer($TEXT, filename) {
};
var ASSIGNMENT = makePredicate([ "=", "+=", "-=", "/=", "*=", "%=", ">>=", "<<=", ">>>=", "|=", "^=", "&=" ]);
function parse($TEXT, options) {
    options = defaults(options, {
    });
    var S = {
        input         : typeof $TEXT == "string" ? tokenizer($TEXT, options.filename) : $TEXT,
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
    function embed_tokens(parser) {
    };
    var statement = embed_tokens(function() {
        if (is("operator", "/") || is("operator", "/=")) {
            S.peeked = null;
            S.token = S.input(S.token.value.substr(1)); // force regexp
        }
    });
    var function_ = function(in_statement, ctor) {
        if (!ctor) ctor = in_statement ? AST_Defun : AST_Function;
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
    var maybe_conditional = function(no_in) {
    };
    function is_assignable(expr) {
    };
    var maybe_assign = function(no_in) {
        var start = S.token;
        var left = maybe_conditional(no_in), val = S.token.value;
        if (is("operator") && ASSIGNMENT(val)) {
            if (is_assignable(left)) {
                return new AST_Assign({
                    start    : start,
                    left     : left,
                    operator : val,
                    right    : maybe_assign(no_in),
                    end      : peek()
                });
            }
        }
    };
};
