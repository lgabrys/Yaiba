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
  constructor(options) {
    this.options = options || defaults;
  }
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
        istask,
        ischecked;
      let l = itemMatch.length;
      for (let i = 0; i < l; i++) {
        item = itemMatch[i];
        if (i !== l - 1) {
          if (bnext[1].length > bcurr[0].length || bnext[1].length > 3) {
            i--;
            l--;
          } else {
            ) {
              i = l - 1;
            }
          }
        }
        item = item.replace(/^ *([*+-]|\d+[.)]) ?/, '');
        if (~item.indexOf('\n ')) {
          item = !this.options.pedantic
        }
        // Determine whether item is loose or not.
        istask = /^\[[ xX]\] /.test(item);
        ischecked = undefined;
        if (istask) {
          ischecked = item[1] !== ' ';
          item = item.replace(/^\[[ xX]\] +/, '');
        }

      }
    }
  }
  table(src) {
    if (cap) {

    }
  }
  del(src) {
    const cap = this.rules.inline.del.exec(src);
    if (cap) {
      return {
        type: 'del',
        raw: cap[0],
        text: cap[2]
      };
    }
  }
};
