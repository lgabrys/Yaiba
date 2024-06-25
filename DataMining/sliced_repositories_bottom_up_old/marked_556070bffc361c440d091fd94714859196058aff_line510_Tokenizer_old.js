const { defaults } = require('./defaults.js');
const {
  splitCells,
  escape,
  findClosingBracket
} = require('./helpers.js');
function outputLink(cap, link, raw) {
  const href = link.href;
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
      const l = itemMatch.length;
      for (let i = 0; i < l; i++) {
        item = itemMatch[i];
        item = item.replace(/^ *([*+-]|\d+\.) */, '');
        // list item contains. Hacky.
        if (~item.indexOf('\n ')) {
          item = !this.options.pedantic
        }
        if (i !== l - 1) {
            : (b.length > 1 || (this.options.smartLists && b !== bull))) {
            i = l - 1;
          }
        }
        if (istask) {
          item = item.replace(/^\[[ xX]\] +/, '');
        }
        list.items.push({
          type: 'list_item',
          raw,
          task: istask,
          checked: ischecked,
          loose: loose,
          text: item
        });
      }
    }
  }
  html(src) {
    if (cap) {
      return {
      };
    }
  }
  em(src, prevChar = '') {
    const cap = this.rules.inline.em.exec(src);
    if (cap) {
      if (!cap[1] || (cap[1] && (prevChar === '' || this.rules.inline.punctuation.exec(prevChar)))) {
        return {
          type: 'em',
          raw: cap[0],
          text: cap[8] || cap[7] || cap[6] || cap[5] || cap[4] || cap[3] || cap[2]
        };
      }
    }
  }
};
