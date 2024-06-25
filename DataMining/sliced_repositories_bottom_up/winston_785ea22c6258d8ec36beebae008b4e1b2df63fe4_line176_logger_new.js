const { Stream, Transform } = require('readable-stream');
const { LEVEL, SPLAT } = require('triple-beam');
class Logger extends Transform {


  configure({
    padLevels,
    rewriters,
    stripColors,
  } = {}) {
    if (
      padLevels || rewriters || stripColors
    ) {
  }

  /* eslint-enable valid-jsdoc */
  log(level, msg, ...splat) { // eslint-disable-line max-params
    if (arguments.length === 1) {
      level[LEVEL] = level.level;
    }
    if (arguments.length === 2) {
      if (msg && typeof msg === 'object') {
        msg[LEVEL] = msg.level = level;
      }
    }
    const [meta] = splat;
    if (typeof meta === 'object' && meta !== null) {
      this.write(Object.assign({}, meta, {
        [SPLAT]: splat.slice(0),
      }));
    } else {
  }
}
