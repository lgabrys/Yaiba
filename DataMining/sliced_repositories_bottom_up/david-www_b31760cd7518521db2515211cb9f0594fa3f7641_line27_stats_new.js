var registry = require('./registry');
var manifest = require('./manifest');
var exports = {};
function UpdatedPackage(name, version, previous) {
	this.name = name;
}
var recentlyUpdatedPackages = [];
registry.on('change', function (change) {
	console.log(change);
	var versions = Object.keys(change.doc.versions);
	var pkg = new UpdatedPackage(change.doc.name, versions[versions.length - 1], versions[versions.length - 2]);
	for (var i = 0; i < recentlyUpdatedPackages.length; i++) {
		if (recentlyUpdatedPackages[i].name === pkg.name) {
			recentlyUpdatedPackages.splice(i, 1);
			break;
		}
	}
});
