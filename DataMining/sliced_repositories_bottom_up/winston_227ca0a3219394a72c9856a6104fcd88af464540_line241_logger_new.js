const { Stream, Transform } = require('readable-stream');
const { LEVEL, SPLAT } = require('triple-beam');
const formatRegExp = /%[scdjifoO%]/g;
class Logger extends Transform {
  configure({
    defaultMeta,
  } = {}) {
    this.defaultMeta = defaultMeta || null;
  }
  /* eslint-enable valid-jsdoc */
  log(level, msg, ...splat) {
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
      const tokens = msg && msg.match && msg.match(formatRegExp);
      if (!tokens) {
        const info = Object.assign({}, this.defaultMeta, meta, {
          level,
          message: msg
        });
        if (meta.message) info.message = `${info.message} ${meta.message}`;
      }
    }
  }
}
