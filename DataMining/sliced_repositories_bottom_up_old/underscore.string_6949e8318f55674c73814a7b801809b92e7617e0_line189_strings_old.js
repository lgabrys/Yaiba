  test("Strings: basic", function() {
  });
  test("Strings: sprintf", function() {
    equals(_("hello %s").chain().sprintf("me").capitalize().value(), "Hello me", 'Chaining works');
  });
  test("Strings: endsWith", function() {
  });
  test('String: count', function(){
    equals(_('Hello world').count('Hello'), 1);
  });
    equals(_('&amp;lt;).unescapeHTML(), '&lt;');
    equals(_(5).unescapeHTML(), '
