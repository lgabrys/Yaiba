var camp = require('camp').start({
});
function cache(f) {
}
camp.route(/^\/pypi\/([^\/]+)\/(.*)\.(svg|png|gif|jpg|json)$/,
cache(function(data, match, sendBadge, request) {
  var info = match[1];
  var egg = match[2];  // eg, `gevent`, `Django`.
  var apiUrl = 'https://pypi.python.org/pypi/' + egg + '/json';
  request(apiUrl, function(err, res, buffer) {
    try {
      } else if (info === 'pyversions') {
        var pattern = /^Programming Language \:\: Python \:\: (\d+\.*\d*)?$/;
      } else if (info === 'implementation') {
    } catch(e) {
  });
}));
