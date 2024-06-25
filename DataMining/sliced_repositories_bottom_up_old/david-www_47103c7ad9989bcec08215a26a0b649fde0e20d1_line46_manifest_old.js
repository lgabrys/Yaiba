var events = require('events');
var exports = new events.EventEmitter();
var manifests = {};
function getDependencyDiffs(deps1, deps2) {
	deps1 = deps1 || {};
	deps2 = deps2 || {};
	var keys1 = Object.keys(deps1);
	keys1.forEach(function(key) {
		if(!deps2[key]) {
		} else if(dep1[key] !== dep2[key]) {
		}
	});
}
