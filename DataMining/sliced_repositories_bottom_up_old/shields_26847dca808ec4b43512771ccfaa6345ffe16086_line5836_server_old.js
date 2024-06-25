var secureServer = !!process.env.HTTPS;
var secureServerKey = process.env.HTTPS_KEY;
var secureServerCert = process.env.HTTPS_CRT;
var serverPort = +process.env.PORT || +process.argv[2] || (secureServer? 443: 80);
var bindAddress = process.env.BIND_ADDRESS || process.argv[3] || '::';
var path = require('path');
var Camp = require('camp');
var camp = Camp.start({
  documentRoot: path.join(__dirname, 'public'),
  port: serverPort,
  hostname: bindAddress,
  secure: secureServer,
  cert: secureServerCert,
  key: secureServerKey
});
var tryUrl = require('url').format({
  protocol: secureServer ? 'https' : 'http',
  hostname: bindAddress,
  port: serverPort,
  pathname: 'try.html',
});
var domain = require('domain');
var request = require('request');
var fs = require('fs');
var LruCache = require('./lib/lru-cache.js');
var badge = require('./lib/badge.js');
var svg2img = require('./lib/svg-to-img.js');
var loadLogos = require('./lib/load-logos.js');
var githubAuth = require('./lib/github-auth.js');
var querystring = require('querystring');
var xml2js = require('xml2js');
var serverSecrets = require('./lib/server-secrets');
var semver = require('semver');
var serverStartTime = new Date((new Date()).toGMTString());
var validTemplates = ['default', 'plastic', 'flat', 'flat-square', 'social'];
var darkBackgroundTemplates = ['default', 'flat', 'flat-square'];
var logos = loadLogos();
var redis;
var useRedis = false;
if (process.env.REDISTOGO_URL) {
  var redisToGo = require('url').parse(process.env.REDISTOGO_URL);
  redis = require('redis').createClient(redisToGo.port, redisToGo.hostname);
  useRedis = true;
}
var analytics = {};
var analyticsAutoSaveFileName = process.env.SHIELDS_ANALYTICS_FILE || './analytics.json';
var analyticsAutoSavePeriod = 10000;
setInterval(function analyticsAutoSave() {
}, analyticsAutoSavePeriod);
function defaultAnalytics() {
  var analytics = Object.create(null);
  analytics.vendorMonthly = new Array(36);
  resetMonthlyAnalytics(analytics.vendorMonthly);
  analytics.rawMonthly = new Array(36);
  analytics.vendorFlatMonthly = new Array(36);
  analytics.rawFlatMonthly = new Array(36);
  analytics.vendorFlatSquareMonthly = new Array(36);
  analytics.rawFlatSquareMonthly = new Array(36);
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
function resetMonthlyAnalytics(monthlyAnalytics) {
  for (var i = 0; i < monthlyAnalytics.length; i++) {
    monthlyAnalytics[i] = 0;
  }
}
function cache(f) {
}
camp.route(/^\/website(-(([^-]|--)*?)-(([^-]|--)*)(-(([^-]|--)+)-(([^-]|--)+))?)?\/(.+)\/(.+)\.(svg|png|gif|jpg|json)$/,
cache(function(data, match, sendBadge, request) {
  var onlineMessage = escapeFormat(match[2] != null ? match[2] : "online");
}));
