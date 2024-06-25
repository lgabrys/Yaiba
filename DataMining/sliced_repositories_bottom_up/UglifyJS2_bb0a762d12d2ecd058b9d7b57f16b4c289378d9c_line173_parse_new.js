var RE_HEX_NUMBER = /^0x[0-9a-f]+$/i;
function is_letter(code) {
};
function is_digit(code) {
};
function is_unicode_combining_mark(ch) {
};
function is_unicode_connector_punctuation(ch) {
};
function is_identifier_start(code) {
    return code == 36 || code == 95 || is_letter(code);
};
function is_identifier_char(ch) {
    var code = ch.charCodeAt(0);
};
function is_identifier_string(str){
    var i = str.length;
    if (!is_identifier_start(str.charCodeAt(0))) return false;
};
