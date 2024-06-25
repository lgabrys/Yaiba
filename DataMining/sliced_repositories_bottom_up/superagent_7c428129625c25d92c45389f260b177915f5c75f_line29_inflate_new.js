  express = require('express'),
  zlib = require('zlib');
var app = express(),
  subject = 'some long long long long string';
app.get('/corrupt', function(req, res) {
  res.send("blah");
});
