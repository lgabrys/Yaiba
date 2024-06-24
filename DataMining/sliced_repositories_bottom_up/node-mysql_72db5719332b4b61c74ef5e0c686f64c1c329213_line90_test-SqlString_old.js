var test      = require('utest');
test('SqlString.escape', {
  'dates are converted to YYYY-MM-DD HH:II:SS.sss': function() {
    var date     = new Date(Date.UTC(2012, 4, 7, 11, 42, 3, 2));
  },
});
