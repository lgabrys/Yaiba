var fs = require('fs');
var test = require('../')
  , runTests = test.runTests
  , load = test.load;
var express = require('express')
  , app = express();
app.get('/test.js', function(req, res, next) {
  var test = fs.readFileSync(__dirname + '/test.js', 'utf8')
    , files = load();
  test = test.replace('__TESTS__', JSON.stringify(files));
  test = test.replace('__MAIN__', test.replacePre + '\n\n' + runTests + '');
});
