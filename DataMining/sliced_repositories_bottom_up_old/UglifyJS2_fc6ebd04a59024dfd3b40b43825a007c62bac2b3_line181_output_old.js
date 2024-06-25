function OutputStream(options) {
    options = defaults(options, {
    }, true);
    var to_utf8 = options.ascii_only ? function(str, identifier) {
    } : function(str) {
    function make_string(str, quote) {
        str = str.replace(/[\\\b\f\n\r\v\t\x22\x27\u2028\u2029\0\ufeff]/g,
        });
        str = to_utf8(str);
    };
    function encode_string(str, quote) {
        var ret = make_string(str, quote);
        if (options.inline_script) {
            ret = ret.replace(/<\x2fscript([>\/\t\n\f\r ])/gi, "<\\/script$1");
        }
    };
};
