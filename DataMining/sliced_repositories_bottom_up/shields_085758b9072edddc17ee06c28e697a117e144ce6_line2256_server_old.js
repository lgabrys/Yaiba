var camp = require('camp').start({
});
var fs = require('fs');
var redis;
if (process.env.REDISTOGO_URL) {
  var redisToGo = require('url').parse(process.env.REDISTOGO_URL);
  redis = require('redis').createClient(redisToGo.port, redisToGo.hostname);
} else {
var analytics = {};
var analyticsAutoSaveFileName = './analytics.json';
function defaultAnalytics() {
}
function analyticsAutoLoad() {
  var defaultAnalyticsObject = defaultAnalytics();
  if (useRedis) {
    redis.get(analyticsAutoSaveFileName, function(err, value) {
      if (err == null && value != null) {
        try {
          analytics = JSON.parse(value);
          for (var key in defaultAnalyticsObject) {
            if (!(key in analytics)) {
              analytics[key] = defaultAnalyticsObject[key];
            }
          }
        } catch(e) {
      }
      analytics = defaultAnalyticsObject;
    });
  } else {
    try {
      analytics = JSON.parse(fs.readFileSync(analyticsAutoSaveFileName));
      for (var key in defaultAnalyticsObject) {
        if (!(key in analytics)) {
          analytics[key] = defaultAnalyticsObject[key];
        }
      }
    } catch(e) {
      analytics = defaultAnalyticsObject;
    }
  }
}
var lastDay = (new Date()).getDate();
function incrMonthlyAnalytics(monthlyAnalytics) {
  try {
    var currentDay = (new Date()).getDate();
    while (lastDay !== currentDay) {
      lastDay = (lastDay + 1) % monthlyAnalytics.length;
      monthlyAnalytics[lastDay] = 0;
    }
    monthlyAnalytics[currentDay]++;
  } catch(e) { console.error(e.stack); }
}
function cache(f) {
}
camp.route(/^\/travis(-ci)?\/([^\/]+\/[^\/]+)(?:\/(.+))?\.(svg|png|gif|jpg|json)$/,
cache(function(data, match, sendBadge, request) {
  var userRepo = match[2];  // eg, espadrine/sc
  var branch = match[3];
  var format = match[4];
  var url = 'https://api.travis-ci.org/' + userRepo + '.svg';
  if (branch != null) {
    url += '?branch=' + branch;
  }
}));
camp.route(/^\/wordpress\/v\/(.*)\.(svg|png|gif|jpg|json)$/,
cache(function(data, match, sendBadge, request) {
  var plugin = match[1];  // eg, `localeval`.
  var apiUrl = 'http://api.wordpress.org/plugins/info/1.0/' + plugin + '.json';
  request(apiUrl, function(err, res, buffer) {
    try {
      var data = JSON.parse(buffer);
      if (data.tested) {
        var testedVersion = data.tested;
      } else {
    } catch(e) {
  });
}));
