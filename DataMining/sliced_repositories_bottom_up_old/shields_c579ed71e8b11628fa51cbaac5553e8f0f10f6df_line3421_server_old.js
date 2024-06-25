var secureServer = !!process.env.HTTPS;
var secureServerCert = process.env.HTTPS_CRT;
var serverPort = +process.env.PORT || +process.argv[2] || (secureServer? 443: 80);
var bindAddress = process.env.BIND_ADDRESS || process.argv[3] || '::';
var infoSite = process.env.INFOSITE || "https://shields.io";
var githubApiUrl = process.env.GITHUB_URL || 'https://api.github.com';
var path = require('path');
var Camp = require('camp');
var camp = Camp.start({
  documentRoot: path.join(__dirname, 'public'),
  port: serverPort,
  hostname: bindAddress,
  cert: secureServerCert,
});
var tryUrl = require('url').format({
  hostname: bindAddress,
  port: serverPort,
});
var log = require('./lib/log.js');
var badge = require('./lib/badge.js');
var querystring = require('querystring');
var serverSecrets = require('./lib/server-secrets');
if (serverSecrets && serverSecrets.gh_client_id) {
}
log(tryUrl);

const {latest: latestVersion} = require('./lib/version');
const {
  compare: phpVersionCompare,
  latest: phpLatestVersion,
} = require('./lib/php-version');
const {
  currencyFromCode,
  ordinalNumber,
} = require('./lib/text-formatters');
const {
  floorCount: floorCountColor,
} = require('./lib/color-formatters');
const {
  analyticsAutoLoad,
  incrMonthlyAnalytics,
  getAnalytics
} = require('./lib/analytics');
const {
  makeColorB,
  isValidStyle,
  isSixHex: sixHex,
  makeLabel: getLabel,
  makeLogo: getLogo,
  makeBadgeData: getBadgeData,
} = require('./lib/badge-data');
const countBy = require('lodash.countby');
const {
  handleRequest: cache,
  clearRequestCache
} = require('./lib/request-handler');
const {
  regularUpdate,
  clearRegularUpdateCache
} = require('./lib/regular-update');
const {
  makeSend
} = require('./lib/result-sender');
const {
  fetchFromSvg
} = require('./lib/svg-badge-parser');
const {
  escapeFormat,
  escapeFormatSlashes
} = require('./lib/path-helpers');
const {
  isSnapshotVersion: isNexusSnapshotVersion
} = require('./lib/nexus-version');
const {
  mapNpmDownloads
} = require('./lib/npm-provider');
const {
  teamcityBadge
} = require('./lib/teamcity-badge-helpers');
const {
  mapNugetFeedv2,
  mapNugetFeed
} = require('./lib/nuget-provider');
const {
  getVscodeApiReqOptions,
  getVscodeStatistic
} = require('./lib/vscode-badge-helpers');
const {
  stateColor: githubStateColor,
  checkStateColor: githubCheckStateColor,
  commentsColor: githubCommentsColor
} = require('./lib/github-helpers');
const {
  mapGithubCommitsSince,
  mapGithubReleaseDate
} = require("./lib/github-provider");
var semver = require('semver');
var serverStartTime = new Date((new Date()).toGMTString());

camp.ajax.on('analytics/v1', function(json, end) { end(getAnalytics()); });
var suggest = require('./lib/suggest.js');
function reset() {
  clearRequestCache();
}
module.exports = {
  reset
};
camp.notfound(/\.(svg|png|gif|jpg|json)/, function(query, match, end, request) {
    var format = match[1];
    var badgeData = getBadgeData("404", query);
    badgeData.text[1] = 'badge not found';
    badgeData.colorscheme = 'red';
    badgeData.format = format;
});

camp.notfound(/.*/, function(query, match, end, request) {
  end(null, {template: '404.html'});
});
camp.route(/^\/jira\/issue\/(http(?:s)?)\/(.+)\/([^\/]+)\.(svg|png|gif|jpg|json)$/,
cache(function (data, match, sendBadge, request) {
  var protocol = match[1];  // eg, https
}));
camp.route(/^\/jira\/sprint\/(http(?:s)?)\/(.+)\/([^\/]+)\.(svg|png|gif|jpg|json)$/,
cache(function (data, match, sendBadge, request) {
  request(options, function (err, res, json) {
    if (err != null) {
      badgeData.text[1] = 'inaccessible';
      sendBadge(format, badgeData);
      return;
    }
    try {
      if (json && json.total >= 0) {
        var issuesDone = json.issues.filter(function (el) {
          if (el.fields.resolution != null) {
            return el.fields.resolution.name !== "Unresolved";
          }
        }).length;
        badgeData.text[1] = Math.round(issuesDone * 100 / json.total) + "%";
        switch(issuesDone) {
          case 0:
            badgeData.colorscheme = 'red';
            break;
          case json.total:
            badgeData.colorscheme = 'brightgreen';
            break;
          default:
            badgeData.colorscheme = 'orange';
        }
      } else {
        badgeData.text[1] = 'invalid';
      }
      sendBadge(format, badgeData);
    } catch (e) {
      badgeData.text[1] = 'invalid';
      sendBadge(format, badgeData);
    }
  });
}));
camp.route(/^\/travis(-ci)?\/([^\/]+\/[^\/]+)(?:\/(.+))?\.(svg|png|gif|jpg|json)$/,
cache(function(data, match, sendBadge, request) {
  request(options, function(err, res) {
    if (err != null) {
      log.error('Travis error: ' + err.stack);
      if (res) { log.error(''+res); }
      badgeData.text[1] = 'invalid';
      sendBadge(format, badgeData);
      return;
    }
    try {
      var state = res.headers['content-disposition']
                     .match(/filename="(.+)\.svg"/)[1];
      badgeData.text[1] = state;
      if (state === 'passing') {
        badgeData.colorscheme = 'brightgreen';
      } else if (state === 'failing') {
        badgeData.colorscheme = 'red';
      } else {
        badgeData.text[1] = state;
      }
      sendBadge(format, badgeData);

    } catch(e) {
      badgeData.text[1] = 'invalid';
      sendBadge(format, badgeData);
    }
  });
}));
camp.route(/^\/appveyor\/tests\/([^\/]+\/[^\/]+)(?:\/(.+))?\.(svg|png|gif|jpg|json)$/,
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
camp.route(/^\/gem\/(rt|rd)\/(.*)\.(svg|png|gif|jpg|json)$/,
cache(function(data, match, sendBadge, request) {
  var info = match[1]; // either rt or rd
  var repo = match[2]; // eg, "rspec-puppet-facts"
  var url = 'http://bestgems.org/api/v1/gems/' + repo;
  var totalRank = (info === 'rt');
  if (totalRank) {
    url += '/total_ranking.json';
  } else if (dailyRank) {
    url += '/daily_ranking.json';
  }
  var badgeData = getBadgeData('rank', data);
  request(url, function(err, res, buffer) {
    if (err != null) {
      badgeData.text[1] = 'inaccessible';
    }
    try {
      var data = JSON.parse(buffer);
      var rank;
      if (totalRank) {
        rank = data[0].total_ranking;
      } else if (dailyRank) {
        rank = data[0].daily_ranking;
      }
      var count = Math.floor(100000 / rank);
      badgeData.colorscheme = floorCountColor(count, 10, 50, 100);
      badgeData.text[1] = ordinalNumber(rank);
      badgeData.text[1] += totalRank? '': ' daily';
    } catch (e) {
      badgeData.text[1] = 'invalid';
    }
  });
}));
camp.route(/^\/github\/issues(-pr)?(-closed)?(-raw)?\/([^\/]+)\/([^\/]+)\/?([^\/]+)?\.(svg|png|gif|jpg|json)$/,
cache(function(data, match, sendBadge, request) {
  var ghLabel = match[6];  // eg, website
  var hasLabel = (ghLabel !== undefined);
    (hasLabel? ' label:' + ghLabel: '');
}));
