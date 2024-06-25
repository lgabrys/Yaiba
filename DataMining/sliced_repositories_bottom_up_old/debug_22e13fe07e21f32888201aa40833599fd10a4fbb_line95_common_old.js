
function setup(env) {
	createDebug.debug = createDebug;
	createDebug.default = createDebug;
	createDebug.coerce = coerce;
	createDebug.disable = disable;
	createDebug.enable = enable;
	createDebug.enabled = enabled;
	createDebug.humanize = require('ms');
	Object.keys(env).forEach(key => {
		createDebug[key] = env[key];
	});
	createDebug.instances = [];
	createDebug.names = [];
	createDebug.skips = [];
	createDebug.formatters = {};
	function selectColor(namespace) {
	}
	createDebug.selectColor = selectColor;
	function createDebug(namespace) {
		function debug(...args) {
			args[0] = createDebug.coerce(args[0]);
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				if (match === '%%') {
					return match;
				}
			});
		}
	}
}
