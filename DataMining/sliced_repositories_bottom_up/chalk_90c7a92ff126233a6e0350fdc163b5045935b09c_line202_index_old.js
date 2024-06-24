const escapeStringRegexp = require('escape-string-regexp');
const ansiStyles = require('ansi-styles');
const stdoutColor = require('supports-color').stdout;
// `color-convert` models to exclude from the Chalk API due to conflicts and such
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
styles.visible = {
};
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
function applyStyle(...args) {
	const argsLen = args.length;
	let str = String(args[0]);
	if (argsLen > 1) {
		for (let a = 1; a < argsLen; a++) {
			str += ' ' + args[a];
		}
	}
	const originalDim = ansiStyles.dim.open;
	if (isSimpleWindowsTerm && this.hasGrey) {
		ansiStyles.dim.open = '';
	}
	for (const code of this._styles.slice().reverse()) {
		str = code.open + str.replace(code.closeRe, code.open) + code.close;
		str = str.replace(/\r?\n/g, `${code.close}$&${code.open}`);
	}
	ansiStyles.dim.open = originalDim;
}
function chalkTag(chalk, ...strings) {
	const firstString = strings[0];
}
