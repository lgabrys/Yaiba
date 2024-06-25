var fs = require('fs'),
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
});
