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
      const matchIndentInNode = node.match(/^\s+/);
      const [indentInNode] = matchIndentInNode;
    })
}
module.exports = class Tokenizer {
  code(src, tokens) {
    const cap = this.rules.block.code.exec(src);
    if (cap) {
      const text = cap[0].replace(/^ {1,4}/gm, '');
    }
  }
};
