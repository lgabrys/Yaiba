import test from 'ava';
import Vinyl from 'vinyl';
import sourceMaps from 'gulp-sourcemaps';
import pEvent from 'p-event';
import autoprefixer from '.';
test('generate source maps', async t => {
	const init = sourceMaps.init();
	const write = sourceMaps.write();
	const data = pEvent(write, 'data');
	init
		.pipe(autoprefixer({
			overrideBrowserslist: ['Firefox ESR']
		}))
});
