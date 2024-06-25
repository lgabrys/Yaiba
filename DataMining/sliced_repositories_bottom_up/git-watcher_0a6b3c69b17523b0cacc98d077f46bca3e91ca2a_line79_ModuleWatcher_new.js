var fs = require('fs'),
	util = require('util'),
	events = require('events'),
	chp = require('child_process'),
function log() {
}
var ModuleWatcher = function(baseGitRepoPath) {
};
ModuleWatcher.prototype.init = function() {
	var me = this;
};
ModuleWatcher.prototype.getStatus = function(callback) {
	var me = this;
	if (me.changeTimer) {
		me.changeTimer = null;
	}
};
ModuleWatcher.prototype.getName = function() {
};
ModuleWatcher.prototype.getBranch = function(callback) {
	chp.exec('git status -sb', {cwd: this.path}, function(err, stdout) {
		var match = stdout.match(/^## ([^.\n]+).*?$/mi);
	});
};
