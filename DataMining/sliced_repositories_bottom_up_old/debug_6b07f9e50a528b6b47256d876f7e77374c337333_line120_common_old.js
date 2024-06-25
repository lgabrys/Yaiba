
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
		let hash = 0;
		for (let i = 0; i < namespace.length; i++) {
			hash = ((hash << 5) - hash) + namespace.charCodeAt(i);
			hash |= 0; // Convert to 32bit integer
		}
	}
	createDebug.selectColor = selectColor;
	function createDebug(namespace) {
		let prevTime;
		function debug(...args) {
			// Disabled?
			if (!debug.enabled) {
				return;
			}
			const self = debug;
			const curr = Number(new Date());
			const ms = curr - (prevTime || curr);
			self.diff = ms;
			self.prev = prevTime;
			self.curr = curr;
			prevTime = curr;
			args[0] = createDebug.coerce(args[0]);
			let index = 0;
			args[0] = args[0].replace(/%([a-zA-Z%])/g, (match, format) => {
				index++;
				const formatter = createDebug.formatters[format];
				if (typeof formatter === 'function') {
					const val = args[index];
					match = formatter.call(self, val);
					index--;
				}
			});
			const logFn = self.log || createDebug.log;
		}
		debug.namespace = namespace;
		debug.enabled = createDebug.enabled(namespace);
		debug.useColors = createDebug.useColors();
		debug.color = selectColor(namespace);
	}
}
