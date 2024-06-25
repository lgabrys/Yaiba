    path = require('path'),
    expect = require('chai').expect;
var Config = require('../lib/config');
describe('Config', function() {
  describe('serializeOptions', function() {
    var options = {
      'a': 10,
      'b': '20',
      'c': true,
      'd': false,
      'e': undefined,
      'f': null,
      'g': ['h', 1],
      'j': [],
      'k': [/abc/gi],
      'l': {
        m: true,
        n: '1',
        o: {
          p: false
        }
      },
      'camelKeyOption': 'a',
    };
    it('without filtering', function() {
      var serialisedOptions = Config.serializeOptions(options);
      expect(serialisedOptions, 'true serialised array format').to.contain('-g=h', '-g=1');
    });
  });
});
