var config = global.config,
	util = require('util'),
	events = require('events'),
	mmmagic = require('mmmagic'),
function log() {
	if (console && config.debugMode) {
		console.log.apply(console, arguments);
	}
}
