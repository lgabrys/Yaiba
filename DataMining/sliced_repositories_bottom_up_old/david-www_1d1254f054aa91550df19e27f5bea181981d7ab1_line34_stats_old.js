var david = require('david');
var manifest = require('./manifest');
var exports = {};
function ManifestMeta(url) {
}
function UpdatedPackage(name, version, previous) {
	this.name = name;
}
var recentlyUpdatedPackages = [];
david.on('latestVersionChange', function(name, fromVersion, toVersion) {

	if(fromVersion) {

		recentlyUpdatedPackages.unshift(new UpdatedPackage(name, fromVersion, toVersion));
	}
});
