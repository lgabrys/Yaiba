var request = require('../../');
function parse(str, obj) {
  var val = request.parseString(str);
}
describe('request.parseString()', function(){
  it('should parse', function() {
    parse('name=tj', { name: 'tj' });
    parse('name=Manny&species=cat', { name: 'Manny', species: 'cat' });
    parse('redirect=/&ok', { redirect: '/', ok: '' });
  });
});
