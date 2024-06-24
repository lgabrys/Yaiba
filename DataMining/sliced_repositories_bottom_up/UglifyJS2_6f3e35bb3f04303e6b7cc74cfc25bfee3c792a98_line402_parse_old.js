function js_error(message, filename, line, col, pos) {
};
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
        if (!is_comment) {
            S.comments_before = [];
        }
        S.newline_before = false;
    };
    function read_while(pred) {
        var ret = "", ch, i = 0;
        while ((ch = peek()) && pred(ch, i++))
            ret += next();
    };
    function parse_error(err) {
        js_error(err, filename, S.tokline, S.tokcol, S.tokpos);
    };
    function read_escaped_char(in_string) {
        var ch = next(true, in_string);
    };
    var read_string = with_eof_error("Unterminated string constant", function(quote_char){
        for (;;) {
            var ch = next(true, true);
            if (ch == "\\") {
                var octal_len = 0, first = null;
                ch = read_while(function(ch){
                    if (ch >= "0" && ch <= "7") {
                        if (!first) {
                            first = ch;
                            return ++octal_len;
                        }
                        else if (first <= "3" && octal_len <= 2) return ++octal_len;
                        else if (first >= "4" && octal_len <= 1) return ++octal_len;
                    }
                });
                if (octal_len > 0) ch = String.fromCharCode(parseInt(ch, 8));
                else ch = read_escaped_char(true);
            }
            else if (ch == "\n") parse_error("Unterminated string constant");
        }
    });
};
