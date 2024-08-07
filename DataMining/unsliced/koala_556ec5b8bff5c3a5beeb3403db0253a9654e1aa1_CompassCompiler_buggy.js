/**
 * Compass compiler
 */

'use strict';

var fs          = require('fs'),
	path        = require('path'),
	exec        = require('child_process').exec,
	Compiler    = require(global.appRootPth + '/scripts/Compiler'),
	projectDb   = require(global.appRootPth + '/scripts/storage.js').getProjects(),
	notifier    = require(global.appRootPth + '/scripts/notifier.js'),
	appConfig   = require(global.appRootPth + '/scripts/appConfig.js').getAppConfig(),
	fileWatcher = require(global.appRootPth + '/scripts/fileWatcher.js');

function CompassCompiler(config) {
	Compiler.call(this, config);
}
require('util').inherits(CompassCompiler, Compiler);
module.exports = CompassCompiler;

/**
 * get sass command
 * @return {String}
 */
CompassCompiler.prototype.getCompassCmd = function (flag) {
	if (flag || appConfig.useSystemCommand.compass) {
		return 'compass';
	}

	if (this.compassCmd) return this.compassCmd;

	var compass = '"' + global.appRootPth + '/bin/compass' + '"',
		command = [];

	command.push('"' + global.rubyExecPath + '"' + ' -S');
	command.push(compass);
	command = command.join(' ');
	this.compassCmd = command;
	return command;
};

/**
 * compile sass & scss file
 * @param  {Object} file    compile file object
 * @param  {Function} success compile success calback
 * @param  {Function} fail    compile fail callback
 */
CompassCompiler.prototype.compile = function (file, success, fail) {
	var self = this;
		projectConfig = projectDb[file.pid].config || {},
		projectDir = projectDb[file.pid].src,
		filePath = file.src,
		relativeFilePath = path.relative(projectDir, filePath),
		settings = file.settings;

	var argv = [
		'compile', '"' + relativeFilePath + '"',
		'--output-style', settings.outputStyle,
		];

	if (settings.lineComments === false) {
		argv.push('--no-line-comments');
	}

	if (settings.debugInfo) {
		argv.push('--debug-info');
	}

	var command = self.getCompassCmd(projectConfig.useSystemCommand) + ' ' + argv.join(' ');
	exec(command, {cwd: projectDir, timeout: 5000}, function(error, stdout, stderr){
		if (error !== null) {
			if (fail) fail();
			notifier.throwError(stderr || stdout, filePath);
		} else {
			if (success) success();

			//add watch import file
			var imports = self.getImports('sass', filePath);
			fileWatcher.addImports(imports, filePath);
		}
	});
};
