var githubApiUrl = process.env.GITHUB_URL || 'https://api.github.com';
var Camp = require('camp');
var camp = Camp.start({
});
var loadLogos = require('./load-logos.js');
var githubAuth = require('./lib/github-auth.js');
var querystring = require('querystring');
var logos = loadLogos();
function cache(f) {
  return function getRequest(data, match, end, ask) {
    if (data.maxAge !== undefined && /^[0-9]+$/.test(data.maxAge)) {
      ask.res.setHeader('Cache-Control', 'max-age=' + data.maxAge);
    } else {
  };
}
camp.notfound(/.*/, function(query, match, end, request) {
  end(null, {template: '404.html'});
});
camp.route(/^\/gem\/(rt|rd)\/(.*)\.(svg|png|gif|jpg|json)$/,
cache(function(data, match, sendBadge, request) {
  var info = match[1]; // either rt or rd
  var repo = match[2]; // eg, "rspec-puppet-facts"
  var url = 'http://bestgems.org/api/v1/gems/' + repo;
  var totalRank = (info === 'rt');
  var dailyRank = (info === 'rd');
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
      if (totalRank) {
        var rank = data[0].total_ranking;
      } else if (dailyRank) {
        var rank = data[0].daily_ranking;
      }
      var count = Math.floor(100000 / rank);
      badgeData.colorscheme = floorCountColor(count, 10, 50, 100);
      badgeData.text[1] = ordinalNumber(rank);
      badgeData.text[1] += totalRank? '': ' daily';
    } catch (e) {
      badgeData.text[1] = 'invalid';
    }
  })
}));
camp.route(/^\/pypi\/([^\/]+)\/(.*)\.(svg|png|gif|jpg|json)$/,
cache(function(data, match, sendBadge, request) {
  var info = match[1];
  var egg = match[2];  // eg, `gevent`, `Django`.
  var format = match[3];
  var apiUrl = 'https://pypi.python.org/pypi/' + egg + '/json';
  var badgeData = getBadgeData('pypi', data);
  request(apiUrl, function(err, res, buffer) {
    if (err != null) {
      badgeData.text[1] = 'inaccessible';
    }
    try {
      var data = JSON.parse(buffer);
      if (info.charAt(0) === 'd') {
        badgeData.text[0] = getLabel('downloads', data);
        switch (info.charAt(1)) {
            var downloads = data.info.downloads.last_month;
            badgeData.text[1] = metric(downloads) + '/month';
            var downloads = data.info.downloads.last_week;
            badgeData.text[1] = metric(downloads) + '/week';
            var downloads = data.info.downloads.last_day;
            badgeData.text[1] = metric(downloads) + '/day';
        }
        badgeData.colorscheme = downloadCountColor(downloads);
      } else if (info === 'v') {
        var version = data.info.version;
        var vdata = versionColor(version);
        badgeData.text[1] = vdata.version;
        badgeData.colorscheme = vdata.color;
      } else if (info === 'l') {
        var license = data.info.license;
        badgeData.text[0] = 'license';
        if (license === null || license === 'UNKNOWN') {
          badgeData.text[1] = 'Unknown';
        } else {
          badgeData.text[1] = license;
          badgeData.colorscheme = 'blue';
        }
      } else if (info === 'wheel') {
        var releases = data.releases[data.info.version];
        var hasWheel = false;
        for (var i = 0; i < releases.length; i++) {
              releases[i].packagetype === 'bdist_wheel') {
            hasWheel = true;
          }
        }
        badgeData.text[0] = 'wheel';
        badgeData.text[1] = hasWheel ? 'yes' : 'no';
        badgeData.colorscheme = hasWheel ? 'brightgreen' : 'red';
      } else if (info === 'format') {
        var releases = data.releases[data.info.version];
        var hasWheel = false;
        for (var i = 0; i < releases.length; i++) {
              releases[i].packagetype === 'bdist_wheel') {
            hasWheel = true;
          }
        }
        badgeData.text[0] = 'format';
        if (hasWheel) {
          badgeData.text[1] = 'wheel';
          badgeData.colorscheme = 'brightgreen';
        } else if (hasEgg) {
          badgeData.text[1] = 'egg';
          badgeData.colorscheme = 'red';
        } else {
          badgeData.text[1] = 'source';
          badgeData.colorscheme = 'yellow';
        }
      } else if (info === 'pyversions') {
        var versions = [];
        var pattern = /^Programming Language \:\: Python \:\: ([\d\.]+)$/;
        for (var i = 0; i < data.info.classifiers.length; i++) {
          var matched = pattern.exec(data.info.classifiers[i]);
          }
        }
        ['2', '3'].forEach(function(version) {
          if (versions.some(hasSubVersion)) {
            versions = versions.filter(function(v) { return v !== version; });
          }
        });
        badgeData.text[0] = 'python';
        badgeData.text[1] = versions.sort().join(', ');
        badgeData.colorscheme = 'blue';
      } else if (info === 'implementation') {
        var implementations = [];
        var pattern = /^Programming Language \:\: Python \:\: Implementation \:\: (\S+)$/;
        for (var i = 0; i < data.info.classifiers.length; i++) {
          var matched = pattern.exec(data.info.classifiers[i]);
          }
        }
        badgeData.text[0] = 'implementation';
        badgeData.text[1] = implementations.sort().join(', ');
        badgeData.colorscheme = 'blue';
      } else if (info === 'status') {
        var pattern = /^Development Status \:\: ([1-7]) - (\S+)$/;
        var statusColors = {
            '1': 'red', '2': 'red', '3': 'red', '4': 'yellow',
            '5': 'brightgreen', '6': 'brightgreen', '7': 'red'};
        var statusCode = '1', statusText = 'unknown';
        for (var i = 0; i < data.info.classifiers.length; i++) {
          var matched = pattern.exec(data.info.classifiers[i]);
          if (matched && matched[1] && matched[2]) {
            statusCode = matched[1];
            statusText = matched[2].toLowerCase().replace('-', '--');
            if (statusText === 'production/stable') {
              statusText = 'stable';
            }
          }
        }
        badgeData.text[0] = 'status';
        badgeData.text[1] = statusText;
        badgeData.colorscheme = statusColors[statusCode];
      } else {
        badgeData.text[1] = 'request unknown';
      }
    } catch(e) {
      badgeData.text[1] = 'invalid';
    }
  });
}));
camp.route(/^\/hexpm\/([^\/]+)\/(.*)\.(svg|png|gif|jpg|json)$/,
cache(function(data, match, sendBadge, request) {
  var info = match[1];
  var repo = match[2];  // eg, `httpotion`.
  var apiUrl = 'https://hex.pm/api/packages/' + repo;
  var badgeData = getBadgeData('hex', data);
  request(apiUrl, function(err, res, buffer) {
    if (err != null) {
      badgeData.text[1] = 'inaccessible';
    }
    try {
      var data = JSON.parse(buffer);
      if (info.charAt(0) === 'd') {
        badgeData.text[0] = getLabel('downloads', data);
        switch (info.charAt(1)) {
            var downloads = data.downloads.week;
            badgeData.text[1] = metric(downloads) + '/week';
            var downloads = data.downloads.day;
            badgeData.text[1] = metric(downloads) + '/day';
            var downloads = data.downloads.all;
            badgeData.text[1] = metric(downloads);
        }
        badgeData.colorscheme = downloadCountColor(downloads);
      } else if (info === 'v') {
        var version = data.releases[0].version;
        var vdata = versionColor(version);
        badgeData.text[1] = vdata.version;
        badgeData.colorscheme = vdata.color;
      } else if (info == 'l') {
        var license = (data.meta.licenses || []).join(', ');
        badgeData.text[0] = 'license';
        if ((data.meta.licenses || []).length > 1) badgeData.text[0] += 's';
        if (license == '') {
          badgeData.text[1] = 'Unknown';
        } else {
          badgeData.text[1] = license;
          badgeData.colorscheme = 'blue';
        }
      }
    } catch(e) {
      badgeData.text[1] = 'invalid';
    }
  });
}));
camp.route(/^\/coveralls\/([^\/]+\/[^\/]+)(?:\/(.+))?\.(svg|png|gif|jpg|json)$/,
cache(function(data, match, sendBadge, request) {
  var userRepo = match[1];  // eg, `jekyll/jekyll`.
  var branch = match[2];
  var format = match[3];
  var apiUrl = {
    url: 'http://badge.coveralls.io/repos/' + userRepo + '/badge.png',
    followRedirect: false,
    method: 'HEAD',
  };
  if (branch) {
    apiUrl.url += '?branch=' + branch;
  }
}));
camp.route(/^\/codecov\/c\/(?:token\/(\w+))?[+\/]?([^\/]+\/[^\/]+\/[^\/]+)(?:\/(.+))?\.(svg|png|gif|jpg|json)$/,
cache(function(data, match, sendBadge, request) {
  var token = match[1];
  var branch = match[3];
  var apiUrl = {
    url: 'https://codecov.io/' + userRepo + '/coverage.svg',
    followRedirect: false,
    method: 'HEAD',
  };
  queryParams = {};
  if (branch) {
    queryParams.branch = branch;
  }
  if (token) {
    queryParams.token = token;
  }
  apiUrl.url += '?' + querystring.stringify(queryParams);
}));
camp.route(/^\/codacy\/(?:grade\/)?(?!coverage\/)([^\/]+)(?:\/(.+))?\.(svg|png|gif|jpg|json)$/,
cache(function(data, match, sendBadge, request) {
  var branch = match[2];
  queryParams = {};
  if (branch) {
    queryParams.branch = branch;
  }
}));
camp.route(/^\/codacy\/coverage\/(?!grade\/)([^\/]+)(?:\/(.+))?\.(svg|png|gif|jpg|json)$/,
cache(function(data, match, sendBadge, request) {
  var branch = match[2];
  queryParams = {};
  if (branch) {
    queryParams.branch = branch;
  }
}));
camp.route(/^\/github\/contributors(-anon)?\/([^\/]+)\/([^\/]+)\.(svg|png|gif|jpg|json)$/,
cache(function(data, match, sendBadge, request) {
  var isAnon = match[1];
  var user = match[2];  // eg, qubyte/rubidium
  var repo = match[3];
  var apiUrl = 'https://api.github.com/repos/' + user + '/' + repo + '/contributors?page=1&per_page=1&anon=' + (!!isAnon);
  var badgeData = getBadgeData('contributors', data);
  if (badgeData.template === 'social') {
    badgeData.logo = badgeData.logo || logos.github;
  }
  githubAuth.request(request, apiUrl, {}, function(err, res, buffer) {
    if (err != null) {
      badgeData.text[1] = 'inaccessible';
    }
    try {
      var contributors;
      if (res.headers['link'] && res.headers['link'].indexOf('rel="last"') !== -1) {
        contributors = res.headers['link'].match(/[?&]page=(\d+)[^>]+>; rel="last"/)[1];
      } else {
        contributors = JSON.parse(buffer).length;
      }
      badgeData.text[1] = metric(+contributors);
    } catch(e) {
  });
}));
