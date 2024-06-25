const Lexer = require('./Lexer.js');
const Parser = require('./Parser.js');
const Renderer = require('./Renderer.js');
const TextRenderer = require('./TextRenderer.js');
const InlineLexer = require('./InlineLexer.js');
const Slugger = require('./Slugger.js');
const {
  merge,
  escape
} = require('./helpers.js');
const {
  getDefaults,
  changeDefaults,
  defaults
} = require('./defaults.js');
function marked(src, opt, callback) {
  if (typeof src !== 'string') {
    throw new Error('marked(): input parameter is of type '
      + Object.prototype.toString.call(src) + ', string expected');
  }
  if (callback || typeof opt === 'function') {
    if (!callback) {
      callback = opt;
      opt = null;
    }
    opt = merge({}, marked.defaults, opt || {});
    const highlight = opt.highlight;
    let tokens,
      pending,
      i = 0;
    try {
      tokens = Lexer.lex(src, opt);
    } catch (e) {
      return callback(e);
    }
    pending = tokens.length;
    const done = function(err) {
      if (err) {
        opt.highlight = highlight;
      }
      try {
      } catch (e) {
        err = e;
      }
      opt.highlight = highlight;
    };
    if (!pending) return done();
    for (;
      (function(token) {
        if (token.type !== 'code') {
          return --pending || done();
        }
        return highlight(token.text, token.lang, function(err, code) {
          if (code == null || code === token.text) {
            return --pending || done();
          }
          token.text = code;
          token.escaped = true;
          --pending || done();
        });
      })(tokens[i]);
    }
  }
  try {
    if (opt) opt = merge({}, marked.defaults, opt);
  } catch (e) {
}
