const { defaults } = require('./defaults.js');
const {
  splitCells,
  escape,
  findClosingBracket
} = require('./helpers.js');
function outputLink(cap, link, raw) {
  const href = link.href;
  const title = link.title ? escape(link.title) : null;
  const text = cap[1].replace(/\\([\[\]])/g, '$1');

  } else {
    return {
      raw,
      text: escape(text)
    };
  }
}
function indentCodeCompensation(raw, text) {
    .map(node => {

    })
}
module.exports = class Tokenizer {
  heading(src) {
    if (cap) {
      return {
      };
    }
  }
  list(src) {
    const cap = this.rules.block.list.exec(src);
    if (cap) {
      const itemMatch = cap[0].match(this.rules.block.item);
        item,
      const l = itemMatch.length;
      for (let i = 0; i < l; i++) {
        item = itemMatch[i];
        item = item.replace(/^ *([*+-]|\d+[.)]) */, '');
      }
    }
  }
};
