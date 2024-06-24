const path = require('path');
const config = require('./lib/server-config');
const githubAuth = require('./lib/github-auth');
const { makeMakeBadgeFn } = require('./lib/make-badge');
const { QuickTextMeasurer } = require('./lib/text-measurer');
const {
  metric,
  addv: versionText,
} = require('./lib/text-formatters');
const {
  downloadCount: downloadCountColor,
} = require('./lib/color-formatters');
const {
  makeLabel: getLabel,
  makeBadgeData: getBadgeData,
} = require('./lib/badge-data');
const {
  makeHandleRequestFn,
  clearRequestCache
} = require('./lib/request-handler');
const {
  clearRegularUpdateCache
} = require('./lib/regular-update');
const { makeSend } = require('./lib/result-sender');
const {
  escapeFormat,
} = require('./lib/path-helpers');
const serverStartTime = new Date((new Date()).toGMTString());
const camp = require('camp').start({
  documentRoot: path.join(__dirname, 'public'),
  port: config.bind.port,
  hostname: config.bind.address,
  secure: config.ssl.isSecure,
  cert: config.ssl.cert,
  key: config.ssl.key,
});
function reset() {
}
function stop(callback) {
  if (githubDebugInterval) {
    githubDebugInterval = null;
  }
}
let measurer;
try {
  measurer = new QuickTextMeasurer(config.font.path, config.font.fallbackPath);
} catch (e) {
  measurer = new QuickTextMeasurer('Helvetica');
}
const makeBadge = makeMakeBadgeFn(measurer);
const cache = makeHandleRequestFn(makeBadge);
let githubDebugInterval;
if (config.services.github.debug.enabled) {
  githubDebugInterval = setInterval(() => {
  }, 1000 * config.services.github.debug.intervalSeconds);
}
camp.route(/^\/appveyor\/tests\/([^/]+\/[^/]+)(?:\/(.+))?\.(svg|png|gif|jpg|json)$/,
cache(function(data, match, sendBadge, request) {
  var repo = match[1];  // eg, `gruntjs/grunt`.
  var branch = match[2];
  var apiUrl = 'https://ci.appveyor.com/api/projects/' + repo;
  if (branch != null) {
    apiUrl += '/branch/' + branch;
  }
  var badgeData = getBadgeData('tests', data);
  request(apiUrl, { headers: { 'Accept': 'application/json' } }, function(err, res, buffer) {
    if (err != null) {
      badgeData.text[1] = 'inaccessible';
    }
    try {
      if (res.statusCode === 404) {
        badgeData.text[1] = 'project not found or access denied';
      }
      var data = JSON.parse(buffer);
      var testsTotal = data.build.jobs.reduce((currentValue, job) => currentValue + job.testsCount, 0);
      var testsPassed = data.build.jobs.reduce((currentValue, job) => currentValue + job.passedTestsCount, 0);
      var testsFailed = data.build.jobs.reduce((currentValue, job) => currentValue + job.failedTestsCount, 0);
      var testsSkipped = testsTotal - testsPassed - testsFailed;
      if (testsPassed == testsTotal) {
        badgeData.colorscheme = 'brightgreen';
      } else if (testsFailed == 0 ) {
        badgeData.colorscheme = 'green';
      } else if (testsPassed == 0 ) {
        badgeData.colorscheme = 'red';
      } else{
        badgeData.colorscheme = 'orange';
      }
      badgeData.text[1] = testsPassed + ' passed';
        badgeData.text[1] += ', ' + testsFailed + ' failed';
        badgeData.text[1] += ', ' + testsSkipped + ' skipped';
    } catch(e) {
      badgeData.text[1] = 'invalid';
    }
  });
}));
cache(function (data, match, sendBadge, request) {
  var pkg = match[2]; // package name, e.g. vibe-d
  var version = match[3]; // version (1.2.3 or latest)
  var apiUrl = 'https://code.dlang.org/api/packages/'+pkg;
  if (version) {
    apiUrl += '/' + version;
  }
  apiUrl += '/stats';
  var badgeData = getBadgeData('dub', data);
  request(apiUrl, function(err, res, buffer) {
    try {
      var parsedData = JSON.parse(buffer);
      if (info.charAt(0) === 'd') {
        badgeData.text[0] = getLabel('downloads', data);
        var downloads;
        switch (info.charAt(1)) {
            downloads = parsedData.downloads.monthly;
            badgeData.text[1] = metric(downloads) + '/month';
            downloads = parsedData.downloads.weekly;
            badgeData.text[1] = metric(downloads) + '/week';
            downloads = parsedData.downloads.daily;
            badgeData.text[1] = metric(downloads) + '/day';
            downloads = parsedData.downloads.total;
            badgeData.text[1] = metric(downloads);
        }
        if (version) {
            badgeData.text[1] += ' ' + versionText(version);
        }
        badgeData.colorscheme = downloadCountColor(downloads);
      }
    } catch(e) {
      badgeData.text[1] = 'invalid';
    }
  });
}));
camp.route(/^\/(:|badge\/)(([^-]|--)*?)-(([^-]|--)*)-(([^-]|--)+)\.(svg|png|gif|jpg)$/,
function(data, match, end, ask) {
  var subject = escapeFormat(match[2]);
});
