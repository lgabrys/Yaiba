/**
 * Sass compiler
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

function SassCompiler(config) {
	Compiler.call(this, config);
}
require('util').inherits(SassCompiler, Compiler);
module.exports = SassCompiler;

/**
 * get sass command
 * @return {String}
 */
SassCompiler.prototype.getSassCmd = function () {
	if (appConfig.useSystemCommand.sass) {
		return 'sass';
	}

	if (this.sassCmd) return this.sassCmd;

	var sass = '"' + global.appRootPth + '/bin/sass' + '"',
		command = [];

	command.push('"' + global.rubyExecPath + '"' + ' -S');
	command.push(sass);
	command = command.join(' ');
	this.sassCmd = command;
	return command;
}

/**
 * compile sass & scss file
 * @param  {Object} file    compile file object
 * @param  {Function} success compile success calback
 * @param  {Function} fail    compile fail callback
 */
SassCompiler.prototype.compile = function (file, success, fail) {
	var self = this,
		filePath = file.src,
		output = file.output;

	var settings = file.settings;
	for (var k in appConfig.sass) {
		if (!settings.hasOwnProperty(k)) {
			settings[k] = appConfig.sass[k];
		}
	}

	//run sass compile command
	var argv = ['"'+filePath+'"', '"'+output+'"', '--load-path', '"' + path.dirname(filePath) + '"'];

	//apply project config
	var pcfg = projectDb[file.pid].config;

	//custom options
	var customOptions = pcfg.customOptions;
	if (Array.isArray(customOptions)) {
		customOptions = customOptions.filter(function (item) {
			return /--style|--line-comments|--debug-info|--unix-newlines/.test(item) === false;
		});
		argv = argv.concat(customOptions);
	}

	//include paths
	if (Array.isArray(pcfg.includePaths)) {
		pcfg.includePaths.forEach(function (item) {
			argv.push('--load-path "' + item + '"');
		});
	}

	//require libs
	if (Array.isArray(pcfg.requireLibs)) {
		pcfg.requireLibs.forEach(function (item) {
			argv.push('--require "' + item + '"');
		});
	}

	//apply file settings
	argv.push('--style ' + settings.outputStyle);
	if (settings.lineComments) {
		argv.push('--line-comments');
	}

	if (settings.debugInfo) {
		argv.push('--debug-info');
	}

	if (settings.unixNewlines) {
		argv.push('--unix-newlines');
	}

	if (process.platform === 'win32') {
		argv.push('--cache-location "' + path.dirname(process.execPath) + '\\.sass-cache"');
	}

	var command = self.getSassCmd();
		command += ' ' + argv.join(' ');
	exec(command, {timeout: 5000}, function(error, stdout, stderr){
		if (error !== null) {
			if (fail) fail();
			notifier.throwError(stderr, filePath);
		} else {
			if (success) success();

			//add watch import file
			var imports = self.getImports('sass', filePath);
			fileWatcher.addImports(imports, filePath);
		}
	});
}
