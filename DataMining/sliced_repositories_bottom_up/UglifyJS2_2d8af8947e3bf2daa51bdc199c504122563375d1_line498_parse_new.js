var NEWLINE_CHARS = makePredicate(characters("\n\r\u2028\u2029"));
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
        comments_before : [],
        directives      : {},
        directive_stack : []
    };
    function next(signal_eof, in_string) {
        var ch = S.text.charAt(S.pos++);
        if (NEWLINE_CHARS(ch)) {
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
    function find_eol() {
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
    function parse_error(err) {
        js_error(err, filename, S.tokline, S.tokcol, S.tokpos);
    };
    function skip_line_comment(type) {
        var regex_allowed = S.regex_allowed;
        var i = find_eol(), ret;
        if (i == -1) {
            ret = S.text.substr(S.pos);
            S.pos = S.text.length;
        } else {
            ret = S.text.substring(S.pos, i);
            S.pos = i;
        }
        S.col = S.tokcol + (S.pos - S.tokpos);
        S.regex_allowed = regex_allowed;
    };
    var skip_multiline_comment = with_eof_error("SyntaxError: Unterminated multiline comment", function(){
        var regex_allowed = S.regex_allowed;
        S.regex_allowed = regex_allowed;
    });
    var read_regexp = with_eof_error("SyntaxError: Unterminated regular expression", function(regexp){
        var prev_backslash = false, ch, in_class = false;
        while ((ch = next(true))) if (NEWLINE_CHARS(ch)) {
        } else if (prev_backslash) {
            regexp += "\\" + ch;
            prev_backslash = false;
        } else if (ch == "[") {
            in_class = true;
            regexp += ch;
        } else if (ch == "]" && in_class) {
            in_class = false;
            regexp += ch;
        } else if (ch == "/" && !in_class) {
        } else if (ch == "\\") {
            prev_backslash = true;
        } else {
            regexp += ch;
        }
        try {
        } catch(e) {
          parse_error("SyntaxError: " + e.message);
        }
    });
};
