const path = require('path');
const serverSecrets = require('./lib/server-secrets');
const analytics = require('./lib/analytics');
const config = require('./lib/server-config');
const githubAuth = require('./lib/github-auth');
const sysMonitor = require('./lib/sys/monitor');
const { makeMakeBadgeFn } = require('./lib/make-badge');
const { QuickTextMeasurer } = require('./lib/text-measurer');
const {
  coveragePercentage: coveragePercentageColor,
} = require('./lib/color-formatters');
const {
  makeLabel: getLabel,
  makeBadgeData: getBadgeData,
} = require('./lib/badge-data');
const {
  makeHandleRequestFn,
  clearRequestCache,
} = require('./lib/request-handler');
const {
  regularUpdate,
  clearRegularUpdateCache,
} = require('./lib/regular-update');
const { makeSend } = require('./lib/result-sender');
const { fetchFromSvg } = require('./lib/svg-badge-parser');
const {
  escapeFormat,
  escapeFormatSlashes,
} = require('./lib/path-helpers');
const {
  isSnapshotVersion: isNexusSnapshotVersion,
} = require('./lib/nexus-version');
const {
  mapNpmDownloads,
} = require('./lib/npm-provider');
const {
  defaultNpmRegistryUri,
  makePackageDataUrl: makeNpmPackageDataUrl,
} = require('./lib/npm-badge-helpers');
const {
  teamcityBadge,
} = require('./lib/teamcity-badge-helpers');
const {
  mapNugetFeedv2,
  mapNugetFeed,
} = require('./lib/nuget-provider');
const {
  getVscodeApiReqOptions,
  getVscodeStatistic,
} = require('./lib/vscode-badge-helpers');
const {
  stateColor: githubStateColor,
  checkStateColor: githubCheckStateColor,
  commentsColor: githubCommentsColor,
} = require('./lib/github-helpers');
const {
  mapGithubCommitsSince,
  mapGithubReleaseDate,
} = require('./lib/github-provider');
const {
  sortDjangoVersions,
  parseClassifiers,
} = require('./lib/pypi-helpers.js');
const serverStartTime = new Date((new Date()).toGMTString());
const githubApiUrl = config.services.github.baseUri;
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
githubAuth.scheduleAutosaving({ dir: config.persistence.dir });
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
camp.route(/^\/teamcity\/codebetter\/(.*)\.(svg|png|gif|jpg|json)$/,
cache(function(data, match, sendBadge, request) {
  var buildType = match[1];  // eg, `bt428`.
  var format = match[2];
}));
camp.route(/^\/teamcity\/(http|https)\/(.*)\/(s|e)\/(.*)\.(svg|png|gif|jpg|json)$/,
cache(function(data, match, sendBadge, request) {
  var scheme = match[1];
  var serverUrl = match[2];
  var advanced = (match[3] == 'e');
  var buildType = match[4];  // eg, `bt428`.
  var format = match[5];
}));
camp.route(/^\/teamcity\/coverage\/(.*)\.(svg|png|gif|jpg|json)$/,
cache(function(data, match, sendBadge, request) {
  var buildType = match[1];  // eg, `bt428`.
  var format = match[2];
  var apiUrl = 'http://teamcity.codebetter.com/app/rest/builds/buildType:(id:' + buildType + ')/statistics?guest=1';
  var badgeData = getBadgeData('coverage', data);
  request(apiUrl, { headers: { 'Accept': 'application/json' } }, function(err, res, buffer) {
    if (err != null) {
      badgeData.text[1] = 'inaccessible';
    }
    try {
      var data = JSON.parse(buffer);
      var covered;
      var total;
      data.property.forEach(function(property) {
        if (property.name === 'CodeCoverageAbsSCovered') {
          covered = property.value;
        } else if (property.name === 'CodeCoverageAbsSTotal') {
          total = property.value;
        }
      });
      if (covered === undefined || total === undefined) {
        badgeData.text[1] = 'malformed';
      }
      var percentage = covered / total * 100;
      badgeData.text[1] = percentage.toFixed(0) + '%';
      badgeData.colorscheme = coveragePercentageColor(percentage);
    } catch(e) {
      badgeData.text[1] = 'invalid';
    }
  });
}));
cache(function(queryData, match, sendBadge, request) {
  const mode = match[1];
  const channel = match[2];
  const pkgname = match[3];
  const url = 'https://api.anaconda.org/package/' + channel + '/' + pkgname;
  const labels = {
    'd': 'downloads',
    'p': 'platform',
    'v': channel,
  };
  const variants = {
    // default use `conda|{channelname}` as label
    '': function(queryData, badgeData) {
      badgeData.text[0] = getLabel(`conda|${badgeData.text[0]}`, queryData);
    },
    // skip `conda|` prefix
    'n': function(queryData, badgeData) {
    },
  };
  const variant = variants[mode.charAt(1)];
  var badgeData = getBadgeData(labels[mode.charAt(0)], queryData);
  request(url, function(err, res, buffer) {
    if (err != null) {
      badgeData.text[1] = 'inaccessible';
    }
    try {
      var data = JSON.parse(buffer);
    } catch(e) {
      badgeData.text[1] = 'invalid';
      variant(data, badgeData);
    }
  });
}));
