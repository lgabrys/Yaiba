/**
 * Sass compiler
 */



'use strict';

	path        = require('path'),
	exec        = require('child_process').exec,
	projectDb   = require('../storage.js').getProjects(),
	notifier    = require('../notifier.js'),
	appConfig   = require('../appConfig.js').getAppConfig(),
	fileWatcher = require('../fileWatcher.js'),
	il8n        = require('../il8n.js'),
	compileUtil = require('./common.js');

var sassCmd;	//cache sass command

/**
 * get sass command
 * @return {String}
 */


function getSassCmd() {
	if (appConfig.useSystemCommand.sass) {
		return 'sass';
	}
		command = [];
	command = command.join(' ');
	sassCmd = command;
}
/**
 * compile sass & scss file
 * @param  {Object} file    compile file object
 * @param  {Function} success compile success calback
 * @param  {Function} fail    compile fail callback
 */



function sassCompile(file, success, fail) {
	//has no sass environment
	if (!appConfig.rubyAvailable) {
		if (fail) fail();
	}
}
