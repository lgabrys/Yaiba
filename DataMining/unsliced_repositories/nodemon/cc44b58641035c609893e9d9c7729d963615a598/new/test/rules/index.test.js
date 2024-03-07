/*global describe:true, it: true, beforeEach: true */
var fs = require('fs'),
    rules = require('../../lib/rules'),
    assert = require('assert');

function loadfixtures(sample) {
  var path = './test/fixtures/' + sample;
  return {
    content: fs.readFileSync(path, 'utf8'),
    path: path
  };
}

describe('nodemon rules', function () {
  var fixtures = {
    comments: loadfixtures('comments'),
    regexp: loadfixtures('regexp'),
    default: loadfixtures('default'),
    simple: loadfixtures('simple'),
    simplejson: loadfixtures('simple.json')
  };

  beforeEach(function () {
    rules.reset();
  });

  it('should read json', function (done) {
    rules.load('./test/fixtures/simple.json', function (rules) {
      assert(rules.ignore.re.test('/public/anything'), 'ignores public directory');
      done();
    });
  });

  it('should ignore comments files', function (done) {
    rules.load(fixtures.comments.path, function (rules) {
      assert.equal(rules.ignore.length, 0, 'zero ignore rules');
      done();
    });
  });

  it('should allow comments on lines', function (done) {
    rules.load(fixtures.simple.path, function (rules) {
      rules.ignore.forEach(function (rule) {
        assert.equal(rule.indexOf('# comment'), -1, 'no comment found');
      });
      done();
    });
  });

  it('should read regular expressions', function (done) {
    rules.load(fixtures.regexp.path, function (rules) {
      assert.equal(rules.ignore.re.test('nodemon.js'), true);
      done();
    });
  });
});