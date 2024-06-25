var events = require('events');
var exports = new events.EventEmitter();
var manifests = {};
function PackageDiff(name, version, previous) {
}
function getDependencyDiffs(deps1, deps2) {
	deps1 = deps1 || {};
	deps2 = deps2 || {};
	var keys1 = Object.keys(deps1);
	var diffs = [];
	keys1.forEach(function(key) {

		if(!deps2[key]) {

			// Dep has been deleted
			diffs.push(new PackageDiff(key, null, deps1[key]));
		} else if(deps1[key] !== deps2[key]) {
		}
	});
}
