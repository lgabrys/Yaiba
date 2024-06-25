function OutputStream(options) {
    options = defaults(options, {
    }, true);
    var current_col = 0;
    var last = null;
    function last_char() {
        return last.charAt(last.length - 1);
    };
    function maybe_newline() {
        if (options.max_line_len && current_col > options.max_line_len)
            print("\n");
    };
    function print(str) {
        str = String(str);
        if (might_need_semicolon) {
            if ((!ch || ";}".indexOf(ch) < 0) && !/[;]$/.test(last)) {
                if (options.semicolons || requireSemicolonChars(ch)) {
                    current_col++;
                } else {
                    current_col = 0;
                }
            }
        }
        if (!options.beautify && options.preserve_line && stack[stack.length - 1]) {
            var target_line = stack[stack.length - 1].start.line;
            while (current_line < target_line) {
                OUTPUT += "\n";
                current_pos++;
                current_line++;
                current_col = 0;
                might_need_space = false;
            }
        }
        if (might_need_space) {
            {
                current_col++;
            }
        }
        var a = str.split(/\r?\n/), n = a.length - 1;
        if (n == 0) {
            current_col += a[n].length;
        } else {
            current_col = a[n].length;
        }
        last = str;
    };
    var newline = options.beautify ? function() {
    } : maybe_newline;
};
