var fs = require('fs'),
var ModuleWatcher = function(baseGitRepoPath) {
};
ModuleWatcher.prototype.init = function() {
};
ModuleWatcher.prototype.getStatus = function(callback) {
};
ModuleWatcher.prototype.getName = function() {
};
ModuleWatcher.prototype.getBranch = function(callback) {
};
ModuleWatcher.prototype.refreshIndex = function() {
};
ModuleWatcher.prototype.statusChanged = function() {
}
ModuleWatcher.prototype._fetchIgnoredPaths = function(callback) {
};
ModuleWatcher.prototype._watchDir = function(basePath) {
};
ModuleWatcher.prototype._watchGitRepo = function() {
	var me = this;
	var gitFile = me.path + '/.git';
	fs.stat(gitFile, me.errEmitter.intercept(function(stat) {
		} else {
			fs.readFile(gitFile, {encoding: 'utf8'}, me.errEmitter.intercept(function(contents) {
				var match = contents.trim().match(/^gitdir:\s*(.+)$/);
			}));
		}
	}));
};
