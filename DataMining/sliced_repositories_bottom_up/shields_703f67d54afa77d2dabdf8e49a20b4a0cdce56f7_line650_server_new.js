var camp = require('camp').start({
});
var request = require('request');
function cache(f) {
}
camp.route(/^\/travis(-ci)?\/([^\/]+\/[^\/]+)(?:\/(.+))?\.(svg|png|gif|jpg)$/,
cache(function(data, match, sendBadge) {
  var userRepo = match[2];  // eg, espadrine/sc
  var branch = match[3];
  var format = match[4];
  var options = {
    json: true,
    uri: 'https://api.travis-ci.org/repos/' + userRepo + '/builds.json'
  };
  branch = branch || 'master';
}));
camp.route(/^\/gemnasium\/(.+)\.(svg|png|gif|jpg)$/,
cache(function(data, match, sendBadge) {
  var userRepo = match[1];  // eg, `jekyll/jekyll`.
  var options = 'https://gemnasium.com/' + userRepo + '.svg';
  request(options, function(err, res, buffer) {
    try {
      var nameMatch = buffer.match(/(devD|d)ependencies/)[0];
    } catch(e) {
  });
}));
