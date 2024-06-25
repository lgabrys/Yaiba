var fs = require('fs'),
	util = require('util'),
	async = require('async'),
	events = require('events'),
	chp = require('child_process'),
	mmmagic = require('mmmagic'),
	config = require('loader').loadConfig();
var ModuleWatcher = function(baseGitRepoPath) {
};
ModuleWatcher.prototype.init = function() {
};
ModuleWatcher.prototype.getStatus = function(callback) {
	var me = this;
	me._buildGitStatus(function(err, status) {
		me.getBranch(function(err, branch) {
			status.branch = {
			};
		});
	});
};
ModuleWatcher.prototype.getName = function() {
};
ModuleWatcher.prototype.getBranch = function(callback) {
	chp.exec('git status', {cwd: this.path}, function(err, stdout) {
	});
};
ModuleWatcher.prototype.refreshIndex = function() {
};
ModuleWatcher.prototype._watchDir = function(basePath) {
	var me = this;
	var watcher = fs.watch(basePath, function(event, fileName) {
	});
};
ModuleWatcher.prototype._watchGitRepo = function() {
	var me = this;
	var fileToWatch = this.path + '/.git/HEAD';
	fs.exists(fileToWatch, function(exists) {
	});
};
ModuleWatcher.prototype._watchDirIfNecessary = function(fullPath) {
	var me = this;
	var isSubmodule = me.repo.isSubmodule(me.repo.relativize(fullPath));
	var fileName = require('path').basename(fullPath);
};
ModuleWatcher.prototype._handleGitRepoChange = function() {
};
ModuleWatcher.prototype._handleFileChange = function(changedFilePath) {
	var fileName = require('path').basename(changedFilePath);
ModuleWatcher.prototype._buildGitStatus = function(callback) {
	var me = this;
	var gitStatus = me.repo.getStatus();
	var statuses = {
		unstaged: [],
		staged: []
	};
	var magic = new mmmagic.Magic(mmmagic.MAGIC_MIME);
	async.each(Object.keys(gitStatus), function(relativeRepoFileName, callback) {
		var fileStatus = gitStatus[relativeRepoFileName];
		var filePath = require('path').join(me.path, relativeRepoFileName);
		var fileStatusStr = me._getStatus(fileStatus);
		var gitFileType = me._getItemType(relativeRepoFileName);
		var isUnstaged = (fileStatus & (128|256|512|1024)) > 0;
		var isStaged = (fileStatus & (1|2|4|8|16)) > 0;
		var addStatus = function(type, diff, mimeType) {
		};
	});
};
ModuleWatcher.prototype._getDiff = function(relativeRepoFileName, isStaged, type, callback) {
	var me = this;
	var filePath = require('path').join(me.path, relativeRepoFileName);
	fs.exists(filePath, function(exists) {
	});
};
ModuleWatcher.prototype._getFileDiff = function(filePath, isStaged, type, callback) {
	var me = this;
	var relativeRepoFileName = me._relativize(filePath);
	var headFileContents = me.repo.getHeadBlob(relativeRepoFileName) || '';
	var indexFileContents = me.repo.getIndexBlob(relativeRepoFileName) || '';
	var newFileContents, oldFileContents, diff;
	if (type === 'staged') {
		newFileContents = indexFileContents;
		oldFileContents = headFileContents;
		diff = me.repo.getLineDiffs(relativeRepoFileName, indexFileContents, {useIndex: false});
	} else {
		newFileContents = fs.existsSync(filePath) ? fs.readFileSync(filePath, {encoding: 'utf8'}) : '';
		oldFileContents = isStaged ? indexFileContents : headFileContents;
		diff = me.repo.getLineDiffs(relativeRepoFileName, newFileContents, {useIndex: isStaged});
	}
	var newLines = newFileContents.split(/[\r\n]/);
	var oldLines = oldFileContents.split(/[\r\n]/);
	if (diff === null) {
		return callback(null, newFileContents ? [
			me._getRangeLines(null, {
				start: 0,
				end: newLines.length - 1,
			})
		]: null);
	}
};
