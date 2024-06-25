;(function() {
var inline = {
  escape: /^\\([\\`*{}\[\]()#+\-.!_])/,
  autolink: /^<([^ >]+(@|:\/)[^ >]+)>/,
  tag: /^<!--[^\0]*?-->|^<[^\n>]+>/,
  link: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]\s*\(([^\)]*)\)/,
  reflink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]\s*\[([^\]]*)\]/,
  nolink: /^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,
  strong: /^__([^\0]+?)__(?!_)|^\*\*([^\0]+?)\*\*(?!\*)/,
  em: /^_([^_]+)_|^\*([^*]+)\*/,
  code: /^`([^`]+)`|^``([^\0]+?)``/
};
inline.keys = [
  'escape',
  'autolink',
  'tag',
  'link',
  'reflink',
  'strong',
  'em',
  'code'
];
inline.text = (function(rules) {
  var keys = rules.keys
    , i = 0
    , l = keys.length
    , body = [];

  for (; i < l; i++) {
    body.push(rules[keys[i]].source
      .replace(/(^|[^\[])\^/g, '$1'));
  }

  keys.push('text');

  return new RegExp(
    '^[^\\0]+?(?='
    + body.join('|')
    + '|$)'
  );
})(inline);
inline.lexer = function(str) {
  var out = ''
    , links = tokens.links
    , link
    , text
    , href;

  var rules = inline
    , keys = inline.keys
    , len = keys.length
    , key
    , cap;

  var scan = function() {
    if (!str) return;
    for (var i = 0; i < len; i++) {
      key = keys[i];
      if (cap = rules[key].exec(str)) {
        str = str.substring(cap[0].length);
        return true;
      }
    }
  };

  while (scan()) {
    switch (key) {
      case 'escape':
        out += cap[1];
        break;
      case 'tag':
        out += cap[0];
        break;
      case 'link':
      case 'reflink':
        if (key !== 'link') {
          link = cap[2]
            ? links[cap[2]]
            : links[cap[1]];
          if (!link) {
            out += cap[0];
            break;
          }
        } else {
          text = /^\s*<?([^\s]*?)>?(?:\s+"([^\n]+)")?\s*$/.exec(cap[2]);
          link = {
            href: text[1],
            title: text[2]
          };
        }
        if (cap[0][0] !== '!') {
          out += '<a href="'
            + escape(link.href)
            + '"'
            + (link.title
            ? ' title="'
            + escape(link.title)
            + '"'
            : '')
            + '>'
            + inline.lexer(cap[1])
            + '</a>';
        } else {
          out += '<img src="'
            + escape(link.href)
            + '" alt="'
            + escape(cap[1])
            + '"'
            + (link.title
            ? ' title="'
            + escape(link.title)
            + '"'
            : '')
            + '>';
        }
        break;
      case 'autolink':
        if (cap[2] === '@') {
          text = mangle(cap[1]);
          href = mangle('mailto:') + text;
        } else {
          text = escape(cap[1]);
          href = text;
        }
        out += '<a href="' + href + '">'
          + text
          + '</a>';
        break;
      case 'strong':
        out += '<strong>'
          + inline.lexer(cap[2] || cap[1])
          + '</strong>';
        break;
      case 'em':
        out += '<em>'
          + inline.lexer(cap[2] || cap[1])
          + '</em>';
        break;
      case 'code':
        out += '<code>'
          + escape(cap[2] || cap[1])
          + '</code>';
        break;
      case 'text':
        out += escape(cap[0]);
        break;
      default:
        break;
    }
  }

  return out;
};
}).call(this);
