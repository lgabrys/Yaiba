var RESERVED_WORDS = 'abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized this throws transient volatile'
RESERVED_WORDS = makePredicate(RESERVED_WORDS);
var RE_HEX_NUMBER = /^0x[0-9a-f]+$/i;
function is_letter(code) {
};
function is_digit(code) {
};
function is_unicode_combining_mark(ch) {
};
function is_unicode_connector_punctuation(ch) {
};
function is_identifier(name) {
    return /^[a-z_$][a-z0-9_$]*$/i.test(name) && !RESERVED_WORDS(name);
};
