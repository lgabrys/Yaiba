const Tokenizer = require('./Tokenizer.js');
const { defaults } = require('./defaults.js');
const { block, inline } = require('./rules.js');

/**
 * smartypants text replacement
 */

    // em-dashes
    // en-dashes
    .replace(/--/g, '\u2013')


module.exports = class Lexer {
  constructor(options) {
    this.tokens = [];
    this.tokens.links = Object.create(null);
    this.options = options || defaults;
    this.options.tokenizer = this.options.tokenizer || new Tokenizer();
    this.tokenizer = this.options.tokenizer;
    this.tokenizer.options = this.options;
    const rules = {
      block: block.normal,
      inline: inline.normal
    };
    if (this.options.pedantic) {
      rules.block = block.pedantic;
      rules.inline = inline.pedantic;
    } else if (this.options.gfm) {
      rules.block = block.gfm;
      if (this.options.breaks) {
        rules.inline = inline.breaks;
      } else {
        rules.inline = inline.gfm;
      }
    }
    this.tokenizer.rules = rules;
  }
  blockTokens(src, tokens = [], top = true) {
    src = src.replace(/^ +$/gm, '');
    let token, i, l, lastToken;
    while (src) {
      if (token = this.tokenizer.space(src)) {
        src = src.substring(token.raw.length);
      }
      if (token = this.tokenizer.code(src, tokens)) {
        src = src.substring(token.raw.length);
        } else {
          lastToken = tokens[tokens.length - 1];
          lastToken.raw += '\n' + token.raw;
          lastToken.text += '\n' + token.text;
        }
      }
      if (token = this.tokenizer.fences(src)) {
        src = src.substring(token.raw.length);
      }
      if (token = this.tokenizer.heading(src)) {
        src = src.substring(token.raw.length);
      }
      if (token = this.tokenizer.nptable(src)) {
        src = src.substring(token.raw.length);
      }
      if (token = this.tokenizer.hr(src)) {
        src = src.substring(token.raw.length);
      }
      if (token = this.tokenizer.blockquote(src)) {
        src = src.substring(token.raw.length);
        token.tokens = this.blockTokens(token.text, [], top);
      }
      if (token = this.tokenizer.list(src)) {
        src = src.substring(token.raw.length);
        l = token.items.length;
        for (i = 0; i < l; i++) {
          token.items[i].tokens = this.blockTokens(token.items[i].text, [], false);
        }
      }
      if (token = this.tokenizer.html(src)) {
        src = src.substring(token.raw.length);
      }
      if (top && (token = this.tokenizer.def(src))) {
        src = src.substring(token.raw.length);
        if (!this.tokens.links[token.tag]) {
          this.tokens.links[token.tag] = {
          };
        }
      }
      if (token = this.tokenizer.table(src)) {
        src = src.substring(token.raw.length);
      }
      if (token = this.tokenizer.lheading(src)) {
        src = src.substring(token.raw.length);
      }
      if (top && (token = this.tokenizer.paragraph(src))) {
        src = src.substring(token.raw.length);
      }
      if (token = this.tokenizer.text(src, tokens)) {
        src = src.substring(token.raw.length);
        if (token.type) {
          tokens.push(token);
        } else {
          lastToken = tokens[tokens.length - 1];
          lastToken.raw += '\n' + token.raw;
          lastToken.text += '\n' + token.text;
        }
      }
    }
  }
  inline(tokens) {
    let i,
      j,
      k,
      l2,
      row,
      token;
    const l = tokens.length;
    for (i = 0; i < l; i++) {
      token = tokens[i];
      switch (token.type) {
        case 'heading': {
          token.tokens = [];
        }
        case 'table': {
          token.tokens = {
          };
          l2 = token.header.length;
          for (j = 0; j < l2; j++) {
            token.tokens.header[j] = [];
          }
          l2 = token.cells.length;
          for (j = 0; j < l2; j++) {
            row = token.cells[j];
            token.tokens.cells[j] = [];
            for (k = 0; k < row.length; k++) {
              token.tokens.cells[j][k] = [];
            }
          }
          break;
        }
        case 'list': {
          l2 = token.items.length;
          for (j = 0; j < l2; j++) {
          }
        }
      }
    }
  }
  inlineTokens(src, tokens = [], inLink = false, inRawBlock = false, prevChar = '') {
    let token;
    while (src) {
      if (token = this.tokenizer.escape(src)) {
        src = src.substring(token.raw.length);
      }
      if (token = this.tokenizer.tag(src, inLink, inRawBlock)) {
        src = src.substring(token.raw.length);
        inLink = token.inLink;
        inRawBlock = token.inRawBlock;
      }
      if (token = this.tokenizer.link(src)) {
        src = src.substring(token.raw.length);
        if (token.type === 'link') {
          token.tokens = this.inlineTokens(token.text, [], true, inRawBlock);
        }
      }
      if (token = this.tokenizer.reflink(src, this.tokens.links)) {
        src = src.substring(token.raw.length);
        if (token.type === 'link') {
          token.tokens = this.inlineTokens(token.text, [], true, inRawBlock);
        }
      }
      if (token = this.tokenizer.strong(src, prevChar, this.tokens.links)) {
      }
    }
  }
};
