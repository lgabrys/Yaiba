var Camp = require('camp');
var camp = Camp.start({
});
function cache(f) {
}
camp.notfound(/.*/, function(query, match, end, request) {
  end(null, {template: '404.html'});
});
camp.route(/^\/gemnasium\/(.+)\.(svg|png|gif|jpg|json)$/,
cache(function(data, match, sendBadge, request) {
  var userRepo = match[1];  // eg, `jekyll/jekyll`.
  var options = 'https://gemnasium.com/' + userRepo + '.svg';
  request(options, function(err, res, buffer) {
    try {
      var statusMatch = buffer.match(/'14'>(.+)<\/text>\n *<\/g>/)[1];
    } catch(e) {
  });
}));
