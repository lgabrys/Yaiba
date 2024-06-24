var Camp = require('camp');
var camp = Camp.start({
});
var serverSecrets;
try {
  serverSecrets = require('./secret.json');
} catch(e) { console.error('No secret data (secret.json, see server.js):', e); }
function cache(f) {
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
camp.route(/^\/hexpm\/([^\/]+)\/(.*)\.(svg|png|gif|jpg|json)$/,
cache(function(data, match, sendBadge, request) {
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
camp.route(/^\/jenkins(-ci)?\/s\/(http(s)?)\/((?:[^\/]+)(?:\/.+?)?)\/([^\/]+)\.(svg|png|gif|jpg|json)$/,
cache(function(data, match, sendBadge, request) {
  var scheme = match[2];  // http(s)
  var host = match[4];  // jenkins.qa.ubuntu.com
  var job = match[5];  // precise-desktop-amd64_default
  var format = match[6];
  var options = {
    json: true,
    uri: scheme + '://' + host + '/job/' + job + '/api/json?tree=color'
  };
  if (serverSecrets && serverSecrets.jenkins_user) {
    options.auth = {
      user: serverSecrets.jenkins_user,
      pass: serverSecrets.jenkins_pass
    };
  }
  var badgeData = getBadgeData('build', data);
  request(options, function(err, res, json) {
    if (err !== null) {
      badgeData.text[1] = 'inaccessible';
      sendBadge(format, badgeData);
      return;
    }

    try {
      if (json.color === 'blue') {
        badgeData.colorscheme = 'brightgreen';
        badgeData.text[1] = 'passing';
      } else if (json.color === 'red') {
        badgeData.colorscheme = 'red';
        badgeData.text[1] = 'failing';
      } else if (json.color === 'yellow') {
        badgeData.colorscheme = 'yellow';
        badgeData.text[1] = 'unstable';
      } else if (json.color === 'grey' || json.color === 'disabled'
          || json.color === 'aborted' || json.color === 'notbuilt') {
        badgeData.colorscheme = 'lightgrey';
        badgeData.text[1] = 'not built';
      } else {
        badgeData.colorscheme = 'lightgrey';
        badgeData.text[1] = 'building';
      }
      sendBadge(format, badgeData);
    } catch(e) {
      badgeData.text[1] = 'invalid';
      sendBadge(format, badgeData);
    }
  });
}));
