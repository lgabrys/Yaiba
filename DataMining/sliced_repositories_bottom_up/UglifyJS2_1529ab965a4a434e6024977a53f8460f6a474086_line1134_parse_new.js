function tokenizer($TEXT, filename) {
};
var UNARY_PREFIX = makePredicate([
]);
var UNARY_POSTFIX = makePredicate([ "--", "++" ]);
var ASSIGNMENT = makePredicate([ "=", "+=", "-=", "/=", "*=", "%=", ">>=", "<<=", ">>>=", "|=", "^=", "&=" ]);
var PRECEDENCE = (function(a, ret){
    for (var i = 0, n = 1; i < a.length; ++i, ++n) {
        var b = a[i];
        for (var j = 0; j < b.length; ++j) {
            ret[b[j]] = n;
        }
    }
})(
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
    function expect_token(type, val) {
    };
    function expect(punc) { return expect_token("punc", punc); };
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
    function expr_list(closing, allow_trailing_comma, allow_empty) {
        var first = true, a = [];
        while (!is("punc", closing)) {
            if (first) first = false; else expect(",");
            if (allow_trailing_comma && is("punc", closing)) break;
            if (is("punc", ",") && allow_empty) {
                a.push(new AST_Hole({ start: S.token, end: S.token }));
            }
        }
    };
};
