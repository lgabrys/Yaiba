
var util = require('util');
var utils = require('./utils');
var Stream = require('stream');

function Response(req, options) {
  options = options || {};
  var res = this.res = req.res;
  this.body = res.body || {};
}
