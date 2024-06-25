

var KEYWORDS = "break case catch class const continue debugger default delete do else extends finally for function if in instanceof let new return switch throw try typeof var void while with";
KEYWORDS = makePredicate(KEYWORDS);
var RE_BIN_NUMBER = /^0b([01]+)$/i;
var RE_HEX_NUMBER = /^0x([0-9a-f]+)$/i;
var RE_OCT_NUMBER = /^0o?([0-7]+)$/i;
var OPERATORS = makePredicate([
    "+",
]);
var NEWLINE_CHARS = "\n\r\u2028\u2029";
var OPERATOR_CHARS = "+-*&%=<>!?|~^";
var PUNC_OPENERS = "[{(";
var PUNC_SEPARATORS = ",;:";
var PUNC_CLOSERS = ")}]";
var PUNC_AFTER_EXPRESSION = PUNC_SEPARATORS + PUNC_CLOSERS;
var PUNC_BEFORE_EXPRESSION = PUNC_OPENERS + PUNC_SEPARATORS;
var PUNC_CHARS = PUNC_BEFORE_EXPRESSION + "`" + PUNC_CLOSERS;
var WHITESPACE_CHARS = NEWLINE_CHARS + " \u00a0\t\f\u000b\u200b\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\uFEFF";
var NON_IDENTIFIER_CHARS = makePredicate(characters("./'\"" + OPERATOR_CHARS + PUNC_CHARS + WHITESPACE_CHARS));
NEWLINE_CHARS = makePredicate(characters(NEWLINE_CHARS));
OPERATOR_CHARS = makePredicate(characters(OPERATOR_CHARS));
PUNC_AFTER_EXPRESSION = makePredicate(characters(PUNC_AFTER_EXPRESSION));
PUNC_BEFORE_EXPRESSION = makePredicate(characters(PUNC_BEFORE_EXPRESSION));
PUNC_CHARS = makePredicate(characters(PUNC_CHARS));
WHITESPACE_CHARS = makePredicate(characters(WHITESPACE_CHARS));

function is_identifier_char(ch) {
    return !NON_IDENTIFIER_CHARS[ch];
}
function is_identifier_string(str) {
}
function decode_escape_sequence(seq) {
    switch (seq[0]) {
      case "n": return "\n";
      default:
    }
}
function parse_js_number(num) {
    var match;
    if (match = RE_BIN_NUMBER.exec(num)) return parseInt(match[1], 2);
    if (match = RE_HEX_NUMBER.exec(num)) return parseInt(match[1], 16);
    if (match = RE_OCT_NUMBER.exec(num)) return parseInt(match[1], 8);
    var val = parseFloat(num);
}
function JS_Parse_Error(message, filename, line, col, pos) {
    this.message = message;
    this.filename = filename;
    this.line = line;
    this.col = col;
    this.pos = pos;
}
JS_Parse_Error.prototype = Object.create(Error.prototype);
JS_Parse_Error.prototype.constructor = JS_Parse_Error;
JS_Parse_Error.prototype.name = "SyntaxError";
function js_error(message, filename, line, col, pos) {
}
function is_token(token, type, val) {
}
var EX_EOF = {};

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
        directive_stack : [],
        read_template   : with_eof_error("Unterminated template literal", function(strings) {
            var s = "";
            for (;;) {
                var ch = next(true, true);
                switch (ch) {
                  case "\\":
                    ch += next(true, true);
                    break;
                  case "`":
                    strings.push(s);
                    return;
                  case "$":
                    if (peek() == "{") {
                        next();
                        strings.push(s);
                        S.regex_allowed = true;
                        return true;
                    }
                }
                s += ch;
            }
        }),
    };
    function peek() {
    }
    function next(signal_eof, in_string) {
        var ch = S.text.charAt(S.pos++);
        if (NEWLINE_CHARS[ch]) {
            S.col = 0;
            S.line++;
            if (!in_string) S.newline_before = true;
            if (ch == "\r" && peek() == "\n") {
                S.pos++;
                ch = "\n";
            }
        } else {
            S.col++;
        }
    }
    function find_eol() {
    }
    function find(what, signal_eof) {
        var pos = S.text.indexOf(what, S.pos);
        return pos;
    }
    function start_token() {
        S.tokline = S.line;
        S.tokcol = S.col;
        S.tokpos = S.pos;
    }
    function token(type, value, is_comment) {
        S.regex_allowed = type == "operator" && !UNARY_POSTFIX[value]
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
            ret.raw = $TEXT.substring(ret.pos, ret.endpos);
        }
        if (!is_comment) {
            ret.comments_before = S.comments_before;
            ret.comments_after = S.comments_before = [];
        }
        S.newline_before = false;
        return new AST_Token(ret);
    }
    function read_while(pred) {
    }
    function is_octal(num) {
    }
    function read_num(prefix) {
        var has_e = false, after_e = false, has_x = false, has_dot = prefix == ".";
        var num = read_while(function(ch, str) {
            switch (ch) {
                return has_x ? false : (has_x = true);
                return has_x ? true : has_e ? false : (has_e = after_e = true);
              case (after_e = false, "."):
                return has_dot || has_e || has_x || is_octal(str) ? false : (has_dot = true);
            }
        });
        if (prefix) num = prefix + num;
        if (is_octal(num)) {
        } else {
            num = num.replace(has_x ? /([1-9a-f]|.0)_(?=[0-9a-f])/gi : /([1-9]|.0)_(?=[0-9])/gi, "$1");
        }
    }
    function read_escaped_char(in_string) {
        var seq = next(true, in_string);
        if (seq >= "0" && seq <= "7") return read_octal_escape_sequence(seq);
        if (seq == "u") {
            var ch = next(true, in_string);
            seq += ch;
            if (ch != "{") {
                seq += next(true, in_string) + next(true, in_string) + next(true, in_string);
            } else do {
                ch = next(true, in_string);
                seq += ch;
            } while (ch != "}");
        } else if (seq == "x") {
            seq += next(true, in_string) + next(true, in_string);
        }
    }
    function read_octal_escape_sequence(ch) {
        var p = peek();
        if (p >= "0" && p <= "7") {
            ch += next(true);
            if (ch[0] <= "3" && (p = peek()) >= "0" && p <= "7")
                ch += next(true);
        }
    }
    var read_string = with_eof_error("Unterminated string constant", function(quote_char) {
        var quote = next(), ret = "";
        for (;;) {
            var ch = next(true, true);
            if (ch == "\\") ch = read_escaped_char(true);
            ret += ch;
        }
    });
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
        S.comments_before.push(token(type, ret, true));
        S.regex_allowed = regex_allowed;
    }
    var skip_multiline_comment = with_eof_error("Unterminated multiline comment", function() {
        var regex_allowed = S.regex_allowed;
        var i = find("*/", true);
        S.regex_allowed = regex_allowed;
    });
    function read_name() {
        var backslash = false, name = "", ch, escaped = false, hex;
        while (ch = peek()) {
            if (!backslash) {
                if (ch == "\\") escaped = backslash = true, next();
                else if (is_identifier_char(ch)) name += next();
            } else {
                ch = read_escaped_char();
                name += ch;
                backslash = false;
            }
        }
        if (KEYWORDS[name] && escaped) {
            hex = name.charCodeAt(0).toString(16).toUpperCase();
            name = "\\u" + "0000".substr(hex.length) + hex + name.slice(1);
        }
    }
    function with_eof_error(eof_error, cont) {
        return function(x) {
            try {
            } catch (ex) {
                else throw ex;
            }
        };
    }
    function next_token(force_regexp) {
    }
    next_token.context = function(nc) {
        if (nc) S = nc;
    };
    next_token.add_directive = function(directive) {
        if (S.directives[directive]) S.directives[directive]++;
        else S.directives[directive] = 1;
    }
    next_token.push_directives_stack = function() {
    }
    next_token.pop_directives_stack = function() {
        var directives = S.directive_stack.pop();
        for (var i = directives.length; --i >= 0;) {
            S.directives[directives[i]]--;
        }
    }
    next_token.has_directive = function(directive) {
    }
}
var UNARY_PREFIX = makePredicate("typeof void delete -- ++ ! ~ - +");
var UNARY_POSTFIX = makePredicate("-- ++");
var ASSIGNMENT = makePredicate("= += -= /= *= %= **= >>= <<= >>>= &= |= ^= &&= ||= ??=");
var PRECEDENCE = function(a, ret) {
    for (var i = 0; i < a.length;) {
        var b = a[i++];
        for (var j = 0; j < b.length; j++) {
            ret[b[j]] = i;
        }
    }
}([
function parse($TEXT, options) {
    options = defaults(options, {
    }, true);
    var S = {
        input         : typeof $TEXT == "string"
                        ? tokenizer($TEXT, options.filename, options.html5_comments, options.shebang)
                        : $TEXT,
        in_async      : false,
        in_directives : true,
        in_funarg     : -1,
        in_function   : 0,
        in_generator  : false,
        in_loop       : 0,
        labels        : [],
        peeked        : null,
        prev          : null,
        token         : null,
    };
    S.token = next();
    function is(type, value) {
    }
    function peek() {
        return S.peeked || (S.peeked = S.input());
    }
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
    }
    function prev() {
        return S.prev;
    }
    function croak(msg, line, col, pos) {
    }
    function unexpected(token) {
        if (token == null) token = S.token;
    }
    function expect_token(type, val) {
    }
    function has_newline_before(token) {
    }
    function can_insert_semicolon() {
    }
    function semicolon(optional) {
    }
    function parenthesised() {
    }
    function embed_tokens(parser) {
    }
    function handle_regexp() {
        if (is("operator", "/") || is("operator", "/=")) {
            S.peeked = null;
            S.token = S.input(S.token.value.substr(1)); // force regexp
        }
    }
    var statement = embed_tokens(function() {
        switch (S.token.type) {
          case "string":
            var dir = S.in_directives;
            var body = expression();
            if (dir) {
                if (body instanceof AST_String) {
                    var value = body.start.raw.slice(1, -1);
                    S.input.add_directive(value);
                    body.value = value;
                } else {
                    S.in_directives = dir = false;
                }
            }
            semicolon();
            return dir ? new AST_Directive(body) : new AST_SimpleStatement({ body: body });
          case "num":
          case "bigint":
          case "regexp":
          case "operator":
          case "atom":
            return simple_statement();

          case "name":
            switch (S.token.value) {
              case "async":
                if (is_token(peek(), "keyword", "function")) {
                    next();
                    next();
                    if (!is("operator", "*")) return function_(AST_AsyncDefun);
                    next();
                    return function_(AST_AsyncGeneratorDefun);
                }
                break;
              case "await":
                if (S.in_async) return simple_statement();
                break;
              case "export":
                next();
                return export_();
              case "import":
                var token = peek();
                if (!(token.type == "punc" && /^[(.]$/.test(token.value))) {
                    next();
                    return import_();
                }
              case "yield":
                if (S.in_generator) return simple_statement();
                break;
            }
            return is_token(peek(), "punc", ":")
                ? labeled_statement()
                : simple_statement();

          case "punc":
            switch (S.token.value) {
              case "{":
                return new AST_BlockStatement({
                    start : S.token,
                    body  : block_(),
                    end   : prev()
                });
              case "[":
              case "(":
              case "`":
                return simple_statement();
              case ";":
                S.in_directives = false;
                next();
                return new AST_EmptyStatement();
              default:
                unexpected();
            }

          case "keyword":
            switch (S.token.value) {
              case "break":
                next();
                return break_cont(AST_Break);

              case "class":
                next();
                return class_(AST_DefClass);

              case "const":
                next();
                var node = const_();
                semicolon();
                return node;

              case "continue":
                next();
                return break_cont(AST_Continue);

              case "debugger":
                next();
                semicolon();
                return new AST_Debugger();

              case "do":
                next();
                var body = in_loop(statement);
                expect_token("keyword", "while");
                var condition = parenthesised();
                semicolon(true);
                return new AST_Do({
                    body      : body,
                    condition : condition
                });

              case "while":
                next();
                return new AST_While({
                    condition : parenthesised(),
                    body      : in_loop(statement)
                });

              case "for":
                next();
                return for_();

              case "function":
                next();
                if (!is("operator", "*")) return function_(AST_Defun);
                next();
                return function_(AST_GeneratorDefun);

              case "if":
                next();
                return if_();

              case "let":
                next();
                var node = let_();
                semicolon();
                return node;

              case "return":
                if (S.in_function == 0 && !options.bare_returns)
                    croak("'return' outside of function");
                next();
                var value = null;
                if (is("punc", ";")) {
                    next();
                } else if (!can_insert_semicolon()) {
                    value = expression();
                    semicolon();
                }
                return new AST_Return({
                    value: value
                });

              case "switch":
                next();
                return new AST_Switch({
                    expression : parenthesised(),
                    body       : in_loop(switch_body_)
                });

              case "throw":
                next();
                if (has_newline_before(S.token))
                    croak("Illegal newline after 'throw'");
                var value = expression();
                semicolon();
                return new AST_Throw({
                    value: value
                });

              case "try":
                next();
                return try_();

              case "var":
                next();
                var node = var_();
                semicolon();
                return node;

              case "with":
                if (S.input.has_directive("use strict")) {
                    croak("Strict mode may not include a with statement");
                }
                next();
                return new AST_With({
                    expression : parenthesised(),
                    body       : statement()
                });
            }
        }
    });
    function labeled_statement() {
    }
    function simple_statement() {
    }
    function break_cont(type) {
        var label = null, ldef;
        if (!can_insert_semicolon()) {
            label = as_symbol(AST_LabelRef, true);
        }
        if (label != null) {
            ldef = find_if(function(l) {
            }, S.labels);
            label.thedef = ldef;
        } else if (S.in_loop == 0) croak(type.TYPE + " not inside a loop or switch");
    }
    function class_(ctor) {
        var was_async = S.in_async;
        var was_gen = S.in_generator;
        while (!is("punc", "}")) {
            if (is("operator", "*")) {
                var key = as_property_key();
            }
            var key = as_property_key();
            if (is("operator", "=")) {
                S.in_async = false;
                S.in_generator = false;
                S.in_generator = was_gen;
                S.in_async = was_async;
            } else if (!(is("punc", ";") || is("punc", "}"))) {
                var type = null;
                switch (key) {
                    type = AST_ClassGetter;
                    type = AST_ClassSetter;
                }
                if (type) {
                }
            }
        }
        S.in_generator = was_gen;
        S.in_async = was_async;
    }
    function for_() {
    }
    function arrow(exprs, start, async) {
        var was_async = S.in_async;
        var was_gen = S.in_generator;
        S.in_async = async;
        S.in_generator = false;
        var was_funarg = S.in_funarg;
        S.in_funarg = S.in_function;
        S.in_funarg = was_funarg;
        var loop = S.in_loop;
        var labels = S.labels;
        ++S.in_function;
        S.in_directives = true;
        S.in_loop = 0;
        S.labels = [];
        --S.in_function;
        S.in_loop = loop;
        S.labels = labels;
        S.in_generator = was_gen;
        S.in_async = was_async;
    }
    var function_ = function(ctor) {
        var was_async = S.in_async;
        var was_gen = S.in_generator;
        if (/Defun$/.test(ctor.TYPE)) {
            S.in_async = /^Async/.test(ctor.TYPE);
            S.in_generator = /Generator/.test(ctor.TYPE);
        } else {
            S.in_async = /^Async/.test(ctor.TYPE);
            S.in_generator = /Generator/.test(ctor.TYPE);
        }
        var was_funarg = S.in_funarg;
        S.in_funarg = S.in_function;
        S.in_funarg = was_funarg;
        var loop = S.in_loop;
        var labels = S.labels;
        ++S.in_function;
        S.in_directives = true;
        S.in_loop = 0;
        S.labels = [];
        --S.in_function;
        S.in_loop = loop;
        S.labels = labels;
        S.in_generator = was_gen;
        S.in_async = was_async;
    };
    function if_() {
    }
    function export_() {
    }
    function import_() {
    }
    function block_() {
    }
    function switch_body_() {
    }
    function try_() {
    }
    var const_ = function(no_in) {
    };
    var let_ = function(no_in) {
    };
    var var_ = function(no_in) {
    };
    var expr_atom = function(allow_calls) {
        var start = S.token;
        if (is("punc")) {
            switch (start.value) {
                var ex = expression(false, true);
                var len = start.comments_before.length;
                start.comments_before.length = 0;
                start.comments_before = ex.start.comments_before;
                start.comments_before_length = len;
                if (len == 0 && start.comments_before.length > 0) {
                    var comment = start.comments_before[0];
                    if (!comment.nlb) {
                        comment.nlb = start.nlb;
                        start.nlb = false;
                    }
                }
                start.comments_after = ex.start.comments_after;
                ex.start = start;
                var end = prev();
                end.comments_before = ex.end.comments_before;
                end.comments_after.forEach(function(comment) {
                    if (comment.nlb) S.token.nlb = true;
                });
                end.comments_after.length = 0;
                end.comments_after = ex.end.comments_after;
                ex.end = end;
            }
        }
        if (is("name")) {
            var sym = _make_symbol(AST_SymbolRef, start);
            if (sym.name == "async") {
                if (is("name") && is_token(peek(), "punc", "=>")) {
                    start = S.token;
                    sym = _make_symbol(AST_SymbolRef, start);
                }
            }
        }
    };
    function as_property_key() {
    }
    function _make_symbol(type, token) {
        switch (name) {
            type = AST_Super;
            type = AST_This;
        }
    }
    function as_symbol(type, noerror) {
    }
    function maybe_unary(no_in) {
        var start = S.token;
        if (S.in_async && is("name", "await")) {
            if (S.in_funarg === S.in_function) croak("Invalid use of await in function argument");
            S.input.context().regex_allowed = true;
            next();
            return new AST_Await({
                start: start,
                expression: maybe_unary(no_in),
                end: prev(),
            });
        }
        if (S.in_generator && is("name", "yield")) {
            if (S.in_funarg === S.in_function) croak("Invalid use of yield in function argument");
            S.input.context().regex_allowed = true;
            next();
            var exp = null;
            var nested = false;
            if (is("operator", "*")) {
                next();
                exp = maybe_assign(no_in);
                nested = true;
            } else if (is("punc") ? !PUNC_AFTER_EXPRESSION[S.token.value] : !can_insert_semicolon()) {
                exp = maybe_assign(no_in);
            }
            return new AST_Yield({
                start: start,
                expression: exp,
                nested: nested,
                end: prev(),
            });
        }
    }
    function maybe_assign(no_in) {
    }
    function expression(no_in, maybe_arrow) {
        var start = S.token;
    }
    function in_loop(cont) {
        ++S.in_loop;
        --S.in_loop;
    }
    return function() {
        var start = S.token;
        var end = prev() || start;
    }();
}
