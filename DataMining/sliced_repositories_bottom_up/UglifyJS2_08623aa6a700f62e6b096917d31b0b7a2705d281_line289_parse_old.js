var KEYWORDS_BEFORE_EXPRESSION = 'return new delete throw else case';
KEYWORDS_BEFORE_EXPRESSION = makePredicate(KEYWORDS_BEFORE_EXPRESSION);
var PUNC_BEFORE_EXPRESSION = makePredicate(characters("[{(,.;:"));
function tokenizer($TEXT, filename, html5_comments, shebang) {
    var S = {
        text            : $TEXT,
        filename        : filename,
        pos             : 0,
        tokpos          : 0,
        line            : 1,
        tokline         : 0,
        col             : 0,
        tokcol          : 0,
        newline_before  : false,
        regex_allowed   : false,
        comments_before : []
    };
    function peek() { return S.text.charAt(S.pos); };
    function next(signal_eof, in_string) {
        var ch = S.text.charAt(S.pos++);
        if ("\r\n\u2028\u2029".indexOf(ch) >= 0) {
            S.newline_before = S.newline_before || !in_string;
            ++S.line;
            S.col = 0;
            if (!in_string && ch == "\r" && peek() == "\n") {
                ++S.pos;
                ch = "\n";
            }
        } else {
            ++S.col;
        }
    };
    function start_token() {
        S.tokline = S.line;
        S.tokcol = S.col;
        S.tokpos = S.pos;
    };
    function token(type, value, is_comment) {
        S.regex_allowed = ((type == "operator" && !UNARY_POSTFIX(value)) ||
                           (type == "keyword" && KEYWORDS_BEFORE_EXPRESSION(value)) ||
                           (type == "punc" && PUNC_BEFORE_EXPRESSION(value)));
        var ret = {
            type    : type,
            value   : value,
            line    : S.tokline,
            col     : S.tokcol,
            pos     : S.tokpos,
            endline : S.line,
            endcol  : S.col,
            endpos  : S.pos,
            nlb     : S.newline_before,
            file    : filename
        };
        if (/^(?:num|string|regexp)$/i.test(type)) {
            ret.literal = $TEXT.substring(ret.pos, ret.endpos);
        }
    };
};
