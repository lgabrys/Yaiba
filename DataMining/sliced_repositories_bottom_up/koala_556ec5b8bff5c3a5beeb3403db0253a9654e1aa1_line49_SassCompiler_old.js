/**
 * Sass compiler
 */



'use strict';

	path        = require('path'),
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


SassCompiler.prototype.sassCompile = function (file, success, fail) {
}
