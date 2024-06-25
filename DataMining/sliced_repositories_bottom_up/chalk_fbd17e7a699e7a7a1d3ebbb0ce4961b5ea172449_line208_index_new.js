const escapeStringRegexp = require('escape-string-regexp');
const ansiStyles = require('ansi-styles');
const supportsColor = require('supports-color');
const styles = Object.create(null);
function Chalk(options) {
}
if (isSimpleWindowsTerm) {
	ansiStyles.blue.open = '\u001B[94m';
}
for (const key of Object.keys(ansiStyles)) {
	ansiStyles[key].closeRe = new RegExp(escapeStringRegexp(ansiStyles[key].close), 'g');
	styles[key] = {
	};
}
ansiStyles.color.closeRe = new RegExp(escapeStringRegexp(ansiStyles.color.close), 'g');
for (const model of Object.keys(ansiStyles.color.ansi)) {
	styles[model] = {
	};
}
ansiStyles.bgColor.closeRe = new RegExp(escapeStringRegexp(ansiStyles.bgColor.close), 'g');
for (const model of Object.keys(ansiStyles.bgColor.ansi)) {
	const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);
	styles[bgModel] = {
	};
}
function applyStyle() {
	if (argsLen > 1) {
		// Don't slice `arguments`, it prevents V8 optimizations
	}
	const originalDim = ansiStyles.dim.open;
	if (isSimpleWindowsTerm && this.hasGrey) {
		ansiStyles.dim.open = '';
	}
	ansiStyles.dim.open = originalDim;
}
function chalkTag(chalk, strings) {
	const args = [].slice.call(arguments, 2);
	if (!Array.isArray(strings)) {
		return strings.toString();
	}
	const parts = [strings.raw[0]];
	for (let i = 1; i < strings.length; i++) {
		parts.push(args[i - 1].toString().replace(/[{}\\]/g, '\\$&'));
	}
}
