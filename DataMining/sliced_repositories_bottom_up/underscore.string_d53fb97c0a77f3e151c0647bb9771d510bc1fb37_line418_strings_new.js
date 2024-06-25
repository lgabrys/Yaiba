$(document).ready(function() {
  test("Strings: trim", function() {
    equals(_(" foo ").trim(), "foo");


  });
  test("Strings: sprintf", function() {
    equals(_("hello %s").chain().sprintf("me").capitalize().value(), "Hello me", 'Chaining works');
  });
  test("Strings: vsprintf", function() {
    equals(_.vsprintf("%(args[0].id)d - %(args[1].name)s", [{args: [{id: 824}, {name: "Hello World"}]}]), "824 - Hello World", 'Named replacement with arrays works');
  });
  test("Strings: endsWith", function() {
    ok(_.endsWith("foobar", "bar"), 'foobar ends with bar');
  });
  test('String: clean', function(){
    equals(_.clean(''), '');
  });
  test('String: lines', function() {
    equals(_('').lines().length, 1);
  });
});
