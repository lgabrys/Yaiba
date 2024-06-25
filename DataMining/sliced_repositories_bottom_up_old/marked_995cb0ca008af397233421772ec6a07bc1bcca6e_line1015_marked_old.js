/**
 * marked - a markdown parser
 * Copyright (c) 2011-2013, Christopher Jeffrey. (MIT Licensed)
 * https://github.com/chjj/marked
 */
;(function() {
var block = {
  newline: /^\n+/,
  code: /^( {4}[^\n]+\n*)+/,
  fences: noop,
  hr: /^( *[-*_]){3,} *(?:\n+|$)/,
  heading: /^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,
  nptable: noop,
  lheading: /^([^\n]+)\n *(=|-){3,} *\n*/,
  blockquote: /^( *>[^\n]+(\n[^\n]+)*\n*)+/,
  list: /^( *)(bull) [\s\S]+?(?:hr|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,
  html: /^ *(?:comment|closed|closing) *(?:\n{2,}|\s*$)/,
  def: /^ *\[([^\]]+)\]: *([^\s]+)(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,
  table: noop,
  paragraph: /^([^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+\n*/,
  text: /^[^\n]+/
};
block.bullet = /(?:[*+-]|\d+\.)/;
block.item = /^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;
block.item = replace(block.item, 'gm')
block.list = replace(block.list)
block._tag = '(?!(?:'
block.html = replace(block.html)
block.paragraph = replace(block.paragraph)
block.normal = merge({}, block);
block.gfm = merge({}, block.normal, {
  fences: /^ *(`{3,}|~{3,}) *(\w+)? *\n([\s\S]+?)\s*\1 *(?:\n+|$)/,
  paragraph: /^/
});
block.gfm.paragraph = replace(block.paragraph)
block.tables = merge({}, block.gfm, {
  nptable: /^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,
  table: /^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/
});
function Lexer(options) {
}
Lexer.rules = block;
Lexer.lex = function(src, options) {
};
Lexer.prototype.lex = function(src) {
  src = src
};
Lexer.prototype.token = function(src, top) {
    , cap
  while (src) {
    if (cap = this.rules.newline.exec(src)) {
      src = src.substring(cap[0].length);
    }
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
      cap = cap[0].replace(/^ {4}/gm, '');
    }
    if (cap = this.rules.fences.exec(src)) {
      src = src.substring(cap[0].length);
    }
    if (cap = this.rules.heading.exec(src)) {
      src = src.substring(cap[0].length);
    }
    if (top && (cap = this.rules.nptable.exec(src))) {
      src = src.substring(cap[0].length);
      item = {
        align: cap[2].replace(/^ *|\| *$/g, '').split(/ *\| */),
      };
    }
    if (cap = this.rules.lheading.exec(src)) {
      src = src.substring(cap[0].length);
    }
    if (cap = this.rules.hr.exec(src)) {
      src = src.substring(cap[0].length);
    }
    if (cap = this.rules.blockquote.exec(src)) {
      src = src.substring(cap[0].length);
      cap = cap[0].replace(/^ *> ?/gm, '');
    }
    if (cap = this.rules.list.exec(src)) {
      src = src.substring(cap[0].length);
      cap = cap[0].match(this.rules.item);
    }
    if (cap = this.rules.html.exec(src)) {
      src = src.substring(cap[0].length);
    }
    if (top && (cap = this.rules.def.exec(src))) {
      src = src.substring(cap[0].length);
    }
    if (top && (cap = this.rules.table.exec(src))) {
      src = src.substring(cap[0].length);
    }
    if (top && (cap = this.rules.paragraph.exec(src))) {
      src = src.substring(cap[0].length);
    }
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
    }
  }
};
var inline = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_>|])/,
  autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
  url: noop,
  tag: /^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,
  link: /^!?\[(inside)\]\(href\)/,
  reflink: /^!?\[(inside)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
  strong: /^__([\s\S]+?)__(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,
  em: /^\b_((?:__|[\s\S])+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,
  code: /^(`+)([\s\S]*?[^`])\1(?!`)/,
  br: /^ {2,}\n(?!\s*$)/,
  del: noop,
  text: /^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/
};
inline._inside = /(?:\[[^\]]*\]|[^\]]|\](?=[^\[]*\]))*/;
inline._href = /\s*<?([^\s]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;
inline.link = replace(inline.link)
inline.reflink = replace(inline.reflink)
inline.normal = merge({}, inline);
inline.pedantic = merge({}, inline.normal, {
  strong: /^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,
  em: /^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/
});
inline.gfm = merge({}, inline.normal, {
  escape: replace(inline.escape)('])', '~])')(),
  url: /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,
  del: /^~~(?=\S)([\s\S]*?\S)~~/,
  text: replace(inline.text)
    (']|', '~]|')
    ('|', '|https?://|')
    ()
});
inline.breaks = merge({}, inline.gfm, {
  br: replace(inline.br)('{2,}', '*')(),
  text: replace(inline.gfm.text)('{2,}', '*')()
});
function InlineLexer(links, options) {
}
InlineLexer.rules = inline;
InlineLexer.output = function(src, links, opt) {
};
InlineLexer.prototype.output = function(src) {
    , cap;
  while (src) {
    if (cap = this.rules.escape.exec(src)) {
      src = src.substring(cap[0].length);
    }
    if (cap = this.rules.autolink.exec(src)) {
      src = src.substring(cap[0].length);
    }
    if (cap = this.rules.url.exec(src)) {
      src = src.substring(cap[0].length);
    }
    if (cap = this.rules.tag.exec(src)) {
      src = src.substring(cap[0].length);
    }
    if (cap = this.rules.link.exec(src)) {
      src = src.substring(cap[0].length);
    }
    if ((cap = this.rules.reflink.exec(src))
        || (cap = this.rules.nolink.exec(src))) {
      src = src.substring(cap[0].length);
      if (!link || !link.href) {
        src = cap[0].substring(1) + src;
      }
    }
    if (cap = this.rules.strong.exec(src)) {
      src = src.substring(cap[0].length);
    }
    if (cap = this.rules.em.exec(src)) {
      src = src.substring(cap[0].length);
    }
    if (cap = this.rules.code.exec(src)) {
      src = src.substring(cap[0].length);
    }
    if (cap = this.rules.br.exec(src)) {
      src = src.substring(cap[0].length);
    }
    if (cap = this.rules.del.exec(src)) {
      src = src.substring(cap[0].length);
    }
    if (cap = this.rules.text.exec(src)) {
      src = src.substring(cap[0].length);
    }
  }
};
InlineLexer.prototype.outputLink = function(cap, link) {
};
InlineLexer.prototype.mangle = function(text) {
};
function Parser(options) {
}
Parser.parse = function(src, options) {
};
Parser.prototype.parse = function(src) {
};
Parser.prototype.next = function() {
};
Parser.prototype.peek = function() {
};
Parser.prototype.parseText = function() {
};
Parser.prototype.tok = function() {
};
function replace(regex, opt) {
  regex = regex.source;
  opt = opt || '';
  return function self(name, val) {
    val = val.source || val;
    val = val.replace(/(^|[^\[])\^/g, '$1');
    regex = regex.replace(name, val);
  };
}
function merge(obj) {
  var i = 1
    , target
    , key;
  for (; i < arguments.length; i++) {
    target = arguments[i];
    for (key in target) {
      if (Object.prototype.hasOwnProperty.call(target, key)) {
        obj[key] = target[key];
      }
    }
  }
}
function marked(src, opt) {
  try {
    if (opt) {
      opt = merge(opt, marked.defaults);
    }
  } catch (e) {
    e.message += '\nPlease report this to https://github.com/chjj/marked.';
  }
}
marked.options =
marked.setOptions = function(opt) {
  marked.defaults = merge(opt, marked.defaults);
};
}).call(function() {
