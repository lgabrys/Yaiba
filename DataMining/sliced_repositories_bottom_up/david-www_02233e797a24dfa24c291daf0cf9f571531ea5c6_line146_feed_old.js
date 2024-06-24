var npm = require('npm');
var moment = require('moment');
var RSS = require('rss');
var semverext = require('david/semverext');
function Package(name, versions, repo) {
}
Package.TTL = moment.duration({hours: 1});
var packages = {};

function FeedItem(name, previous, current, pubdate, repoUrl) {
}
function packageToFeedItems(pkg) {
	var previous = null;

	return Object.keys(pkg.versions).map(function(version) {
		var item = new FeedItem(pkg.name, previous, version, pkg.versions[version], getRepoUrl(pkg.repo));
		previous = version;
	});
}
function getRepoUrl(data) {
	var url = Object.prototype.toString.call(data) == '[object String]' ? data : data.url;
	if(url && url.indexOf('github.com') != -1) {
	}
}
function buildFeedXml(items, name, deps, limit) {
	limit = limit || 32;
	deps = deps || {};
	items = items.reduce(function(items, item) {
	}, []);
	items = items.slice(0, limit);
}
function getPackage(pkgName, callback) {

	var pkg = packages[pkgName];
	npm.commands.view([pkgName, 'time', 'repository'], true, function(err, data) {
		var keys = Object.keys(data);
		var time = keys.length ? data[keys[0]].time : null;
		var repository = keys.length ? data[keys[0]].repository : null;
		if(time) {
			pkg = packages[pkgName] = new Package(pkgName, time, repository);
		} else {
			npm.commands.view([pkgName, 'version'], true, function(err, data) {
				time = {};
				time[Object.keys(data)[0]] = moment([1970]).toDate();
			});
		}
	});
}
